import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { AxiosError } from 'axios';
import { IErrorMessage, IErrorResponse, IResponseRecovery, IRecoveryFormData, IRecoveryTokenFormData } from '../@types/User';
import api from '../services/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/user.reducer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

function Recovery() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string>();
    const { register: registerRecovery, handleSubmit: handleSubmitRecovery, formState: { errors: errorsRecovery } } = useForm<IRecoveryFormData>();
    const { register: registerRecoveryToken, handleSubmit: handleSubmitRecoveryToken, formState: { errors: errorsRecoveryToken } } = useForm<IRecoveryTokenFormData>();
    const [hasToken, setHasToken] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitRecovery = async ({ username }: IRecoveryFormData) => {
        setLoading(true);
        try {
            const { data } = await api.post<IResponseRecovery>('/users/recovery', {
                username,
                token,
            });

            if (data.statusCode === 200) {
                const { message } = data;
                setLoading(false);
                setError('');

                toast.dark(message, {
                    type: 'success',
                    position: 'bottom-right',
                    delay: 1,
                });
                return;
            }
            if (Array.isArray(data.errors)) {
                setError(data.errors.map((error: Partial<IErrorMessage>) => error.message).join('\n'));
            } else {
                setError(data.message);
            }
            setLoading(false);
        } catch (error: any | AxiosError<IErrorResponse>) {
            console.log(error);
            error as Error | AxiosError<IErrorResponse>;

            if (error.code === 'ERR_BAD_RESPONSE') {
                setError('Aguarda uns instantes, servidor está offline!');
            }

            if (Array.isArray(error.response.data.errors)) {
                setError(error.response.data.errors.map((error: Partial<IErrorMessage>) => error.message).join('\n'));
            }

            setLoading(false);
        }
    };

    const onSubmitRecoveryToken = async ({ username, tokenize, password, passwordConfirmation }: IRecoveryTokenFormData) => {
        setLoading(true);
        try {
            const { data } = await api.patch<IResponseRecovery>(`/users/recovery`, {
                username,
                password,
                passwordConfirmation,
                token,
                tokenize,
            });

            if (data.statusCode === 200) {
                const { message } = data;
                setLoading(false);
                setError('');

                toast.dark(message, {
                    type: 'success',
                    position: 'bottom-right',
                    delay: 1,
                });
                return;
            }
            setError('Erro ao efetuar a recuperação!');
            setLoading(false);
        } catch (error: any | AxiosError<IErrorResponse>) {
            console.log(error);
            error as Error | AxiosError<IErrorResponse>;

            if (error.code === 'ERR_BAD_RESPONSE') {
                setError('Aguarda uns instantes, servidor está offline!');
            }

            if (Array.isArray(error.response.data.errors)) {
                setError(error.response.data.errors.map((error: Partial<IErrorMessage>) => error.message).join('\n'));
            }

            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center'>
            <div className="w-3/4 md:w-2/4">
                <div className="my-4 p-4 sm:p-16 border border-[#FFD369] bg-[#2B2B28]">
                    <form method="POST" onSubmit={handleSubmitRecoveryToken(onSubmitRecoveryToken)} className="flex flex-col gap-4 p-4">
                        <div>
                            {error && (
                                <div className="mb-4">
                                    <Alert color="failure">{error}</Alert>
                                </div>
                            )}

                            <div className="mb-2 block">
                                <Label
                                    htmlFor="username"
                                    value="Usuário"
                                />
                            </div>
                            <TextInput
                                id="username"
                                placeholder="Usuário"
                                required={true}
                                {...registerRecoveryToken("username", {
                                    required: 'O usuário é obrigatório',
                                })}
                                autoComplete="username"
                                color={errorsRecoveryToken.username ? "failure" : "gray"}
                            />
                            <ErrorMessage
                                errors={errorsRecoveryToken}
                                name="username"
                                render={({ message }) => <small className="text-red-400">{message}</small>}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="token"
                                    value="Seu Token"
                                />
                            </div>
                            <TextInput
                                id="token"
                                placeholder="Token"
                                required={true}
                                {...registerRecoveryToken("tokenize", {
                                    required: 'O token é obrigatório',
                                })}
                                autoComplete="tokenize"
                                color={errorsRecoveryToken.tokenize ? "failure" : "gray"}
                            />
                            <ErrorMessage
                                errors={errorsRecoveryToken}
                                name="tokenize"
                                render={({ message }) => <small className="text-red-400">{message}</small>}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password"
                                    value="Nova senha"
                                />
                            </div>
                            <div className="flex flex-row justify-between gap-4">
                                <div className="w-full">
                                    <TextInput
                                        id="password"
                                        placeholder="Nova senha"
                                        type="password"
                                        required={true}
                                        {...registerRecoveryToken("password", {
                                            required: 'A senha é obrigatório',
                                        })}
                                        autoComplete="password"
                                        color={errorsRecoveryToken.password ? "failure" : "gray"}
                                    />
                                    <ErrorMessage
                                        errors={errorsRecoveryToken}
                                        name="password"
                                        render={({ message }) => <small className="text-red-400">{message}</small>}
                                    />
                                </div>
                                <div className="w-full">
                                    <TextInput
                                        id="passwordConfirmation"
                                        placeholder="Repita a nova senha"
                                        type="password"
                                        required={true}
                                        {...registerRecoveryToken("passwordConfirmation", {
                                            required: 'A senha é obrigatório',
                                        })}
                                        autoComplete="passwordConfirmation"
                                        color={errorsRecoveryToken.passwordConfirmation ? "failure" : "gray"}
                                    />
                                    <ErrorMessage
                                        errors={errorsRecoveryToken}
                                        name="passwordConfirmation"
                                        render={({ message }) => <small className="text-red-400">{message}</small>}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto bg-[#39311D] mt-2 border border-[#FFD369] text-[#E3B04B] hover:bg-[#292929]/50">
                            <GoogleReCaptcha
                                onVerify={token => setToken(token)}
                                refreshReCaptcha={true}
                            />
                            <Button type="submit" color=''>
                                {loading ? (
                                    <Spinner color="gray" size="md" />
                                ) : (
                                    <>
                                        Alterar senha
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
                <div className=" lg:mx-auto my-4 p-4 border border-[#FFD369] bg-[#2B2B28]">
                    <form method="POST" onSubmit={handleSubmitRecovery(onSubmitRecovery)} className="flex flex-col gap-4 p-4">
                        <div>
                            {error && (
                                <div className="mb-4">
                                    <Alert color="failure">{error}</Alert>
                                </div>
                            )}

                            <div className="mb-2 block">
                                <Label
                                    htmlFor="mailuser1"
                                    value="Usuário"
                                />
                            </div>
                            <TextInput
                                id="mailuser1"
                                placeholder="Usuário"
                                required={true}
                                {...registerRecovery("username", {
                                    required: 'O usuário é obrigatório',
                                })}
                                autoComplete="username"
                                color={errorsRecovery.username ? "failure" : "gray"}
                            />
                            <ErrorMessage
                                errors={errorsRecovery}
                                name="username"
                                render={({ message }) => <small className="text-red-400">{message}</small>}
                            />
                        </div>
                        <div className="mx-auto mt-2 bg-[#39311D] border border-[#FFD369] text-[#E3B04B] hover:bg-[#292929]/50">
                            <GoogleReCaptcha
                                onVerify={token => setToken(token)}
                                refreshReCaptcha={true}
                            />
                            <Button type="submit" color=''>
                                {loading ? (
                                    <Spinner color="gray" size="md" />
                                ) : (
                                    <>
                                        Receber token por e-mail
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Recovery;