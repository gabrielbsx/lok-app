import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { IErrorMessage, IErrorResponse, IResponseAuth, ISignUpFormData } from '../@types/User';
import api from '../services/api';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/user.reducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

function SignIn() {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string>();
    const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<ISignUpFormData>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async ({ name, email, username, password, passwordConfirmation }: ISignUpFormData) => {
        setLoading(true);
        setRefreshReCaptcha(!refreshReCaptcha);
        try {
            const { data } = await api.post<IResponseAuth>('/users/register', {
                name,
                email,
                username,
                password,
                passwordConfirmation,
                token,
            });

            if (data.statusCode === 201) {
                const { auth, user } = data;
                await localStorage.setItem('token', auth.token);
                dispatch(setUser(user));
                setLoading(false);
                setError('');
                toast.dark('Cadastro realizado com sucesso!', {
                    type: 'success',
                    position: 'bottom-right',
                    delay: 1,
                });
                navigate('/');
                return;
            }
            setError('Usuário ou senha inválidos!');
            setLoading(false);
        } catch (error: any | AxiosError<IErrorResponse>) {
            error as Error | AxiosError<IErrorResponse>;

            if (Array.isArray(error.response.data.errors)) {
                setError(error.response.data.errors.map((error: Partial<IErrorMessage>) => error.message).join(', '));
            }

            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center'>
            <div className="w-3/4 md:w-2/4 my-16 p-4 sm:p-16 border border-[#FFD369] bg-[#2B2B28]">
                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-2">
                    <div>
                        {error && (
                            <div className="mb-4">
                                <Alert color="failure">{error}</Alert>
                            </div>
                        )}
                        <div className="mb-2 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                            <Label
                                htmlFor="name1"
                                value="Nome"
                            />
                            <small className="text-green-500 text-[10px] uppercase">não obrigatório</small>
                        </div>
                        <TextInput
                            id="name1"
                            placeholder="Nome"
                            required={false}
                            {...register("name", {
                                required: false,
                            })}
                            autoComplete="name"
                            color={errors.name ? "failure" : "gray"}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({ message }) => <small className="text-red-400">{message}</small>}
                        />
                    </div>
                    <div>
                        <div className="mb-2 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                            <Label
                                htmlFor="email1"
                                value="E-mail"
                            />
                            <small className="text-green-500 text-[10px] uppercase">não obrigatório</small>
                        </div>
                        <TextInput
                            id="email1"
                            placeholder="E-mail"
                            required={false}
                            {...register("email", {
                                required: false,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "E-mail inválido",
                                },
                            })}
                            autoComplete="email"
                            color={errors.email ? "failure" : "gray"}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => <small className="text-red-400">{message}</small>}
                        />
                    </div>
                    <div>
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
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password2"
                                value="Confirme sua senha"
                            />
                        </div>
                        <TextInput
                            id="password2"
                            type="password"
                            required={true}
                            autoComplete="current-password"
                            {...register("passwordConfirmation", {
                                required: 'A confirmação de senha é obrigatória',
                                minLength: {
                                    value: 4,
                                    message: 'A confirmação de senha deve ter no mínimo 4 caracteres',
                                },
                                maxLength: {
                                    value: 10,
                                    message: 'A confirmação de senha deve ter no máximo 10 caracteres',
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9]+$/,
                                    message: 'A confirmação de senha deve conter apenas letras e números',
                                },
                            })}
                            placeholder="Confirme sua senha"
                            color={errors.passwordConfirmation ? "failure" : "gray"}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="passwordConfirmation"
                            render={({ message }) => <small className="text-red-400">{message}</small>}
                        />
                    </div>
                    <div className="mx-auto mt-2 bg-[#39311D] border border-[#FFD369] text-[#E3B04B] hover:bg-[#292929]/50">
                        <GoogleReCaptcha
                            onVerify={token => setToken(token)}
                            refreshReCaptcha={refreshReCaptcha}
                        />
                        <Button type="submit" color=''>
                            {loading ? (
                                <Spinner color="gray" size="xl" />
                            ) : (
                                <>
                                    Cadastrar
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