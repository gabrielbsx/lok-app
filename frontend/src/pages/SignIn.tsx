import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { AxiosError } from 'axios';
import { IErrorMessage, IErrorResponse, IResponseAuth, ISignInFormData } from '../@types/User';
import api from '../services/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/user.reducer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

function SignIn() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string>();
    const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ISignInFormData>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async ({ username, password }: ISignInFormData) => {
        setLoading(true);
        setRefreshReCaptcha(!refreshReCaptcha);
        try {
            const { data } = await api.post<IResponseAuth>('/users/auth', {
                username,
                password,
                token,
            });

            if (data.statusCode === 200) {
                const { auth, user } = data;
                await localStorage.setItem('token', auth.token);

                dispatch(setUser(user));
                setLoading(false);
                setError('');

                toast.dark('Login realizado com sucesso!', {
                    type: 'success',
                    position: 'bottom-right',
                    delay: 1,
                });

                navigate('/');
                return;
            }

            setError(data.errors!.map((error: Partial<IErrorMessage>) => error.message).join('\n'));
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
            <div className="w-2/4 my-4 flex justify-center py-16 border border-[#FFD369] bg-[#2B2B28]">
                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-3/4">
                    <div>
                        {error && (
                            <div className="mb-4">
                                <Alert color="failure">{error}</Alert>
                            </div>
                        )}

                        <div className="mb-2 block">
                            <Label
                                htmlFor="username1"
                                value="Usuário"
                            />
                        </div>
                        <TextInput
                            id="username1"
                            placeholder="Usuário"
                            required={true}
                            {...register("username", {
                                required: 'O usuário é obrigatório',
                                minLength: {
                                    value: 4,
                                    message: 'O usuário deve ter no mínimo 4 caracteres',
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'O usuário deve ter no máximo 10 caracteres',
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message: 'O usuário deve conter apenas letras e números',
                                },
                            })}
                            autoComplete="username"
                            color={errors.username ? "failure" : "gray"}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="username"
                            render={({ message }) => <small className="text-red-400">{message}</small>}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password1"
                                value="Senha"
                            />
                        </div>
                        <TextInput
                            id="password1"
                            type="password"
                            required={true}
                            autoComplete="current-password"
                            {...register("password", {
                                required: 'A senha é obrigatória',
                                minLength: {
                                    value: 4,
                                    message: 'A senha deve ter no mínimo 4 caracteres',
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'A senha deve ter no máximo 10 caracteres',
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message: 'A senha deve conter apenas letras e números',
                                },
                            })}
                            placeholder="Senha"
                            color={errors.password ? "failure" : "gray"}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="password"
                            render={({ message }) => <small className="text-red-400">{message}</small>}
                        />
                    </div>
                    <div className="mx-auto bg-[#39311D] mt-2 border border-[#FFD369] text-[#E3B04B] hover:bg-[#292929]/50">
                        <GoogleReCaptcha
                            onVerify={token => setToken(token)}
                            refreshReCaptcha={refreshReCaptcha}
                        />
                        <Button type="submit" color=''>
                            {loading ? (
                                <Spinner color="gray" size="md" />
                            ) : (
                                <>
                                    Entrar
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;