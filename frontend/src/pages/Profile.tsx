import { ErrorMessage } from '@hookform/error-message';
import { AxiosError } from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import { useMemo, useState } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IErrorMessage, IErrorResponse } from '../@types/User';
import { RootState } from '../redux/reducer';
import { setUser } from '../redux/reducers/user.reducer';
import api from '../services/api';

type UserData = {
    id: number;
    name?: string;
    email?: string;
    username: string;
    access_level: string;
    oldPassword?: string;
    password?: string;
    passwordConfirmation?: string;
    tokenize: string;
    created_at: string;
    updated_at?: string;
    //remember_me_token: boolean;
};

function Profile() {
    const [error, setError] = useState<string>('');
    const [token, setToken] = useState<string>();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserData>();
    const user = useSelector((state: RootState) => state.user.user!);
    const { id } = user;
    const dispatch = useDispatch();

    useMemo(() => {
        setValue('name', user.name);
        // setValue('email', user.email);
    }, []);

    const onSubmit = async (userData: Partial<UserData>): Promise<void> => {
        userData = Object.fromEntries(Object.entries(userData).filter(([key, value]) => value !== null && value !== ''));

        try {
            const { data } = await api.patch(`/users/update`, { ...userData });

            if (data.statusCode === 200) {
                const { token } = data.auth;
                localStorage.setItem('token', token);

                dispatch(setUser(data.user));

                toast.dark(data.message, {
                    type: toast.TYPE.SUCCESS,
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return;
            }

            toast.dark(data.message, {
                type: toast.TYPE.ERROR,
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } catch (error: any) {
            const errors: { rule: string, field: string, message: string }[] = error.response.data.errors;
            const messages = errors.map(({ message }) => message).join(', ');
            setError(messages);
        }
    };

    const handleToken = async (event: any) => {
        event.preventDefault();
        try {
            const { data } = await api.post(`/users/token`, { token });

            if (data.statusCode === 200) {
                toast.dark(data.message, {
                    type: toast.TYPE.SUCCESS,
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return;
            }

            toast.dark(data.message, {
                type: toast.TYPE.ERROR,
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } catch (error: any) {
            error as Error | AxiosError<IErrorResponse>;
            console.log(error);

            if (error.code === 'ERR_BAD_RESPONSE') {
                setError('Aguarda uns instantes, servidor está offline!');
            }

            if (Array.isArray(error.response.data.errors)) {
                setError(error.response.data.errors.map((error: Partial<IErrorMessage>) => error.message).join('\n'));
            }
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-2 mb-4">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Perfil</h1>
                    <div className="mt-4">
                        <form method="POST" onSubmit={handleToken}>
                            <GoogleReCaptcha
                                onVerify={token => setToken(token)}
                                refreshReCaptcha={true}
                            />
                            <Button type="submit">
                                Enviar token ao e-mail
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {error && (
                    <div className="col-span-2 bg-red-300 px-4 py-3 rounded-lg text-center border-red-500 border text-red-700">
                        {error}
                    </div>
                )}
                    <div className="col-span-2 bg-neutral-800 py-4 px-4 mb-2 border rounded-lg shadow border-neutral-700">
                        <Label htmlFor="tokenize" value="Seu token" />
                        <TextInput
                            type="text"
                            id="tokenize"
                            required={true}
                            {...register('tokenize', {
                                required: true,
                            })}
                            color={errors.tokenize ? "failure" : "gray"}
                            placeholder="Seu token"
                        />
                        <ErrorMessage
                            errors={errors}
                            name="tokenize"
                            render={({ message }) => <small className="text-red-400">{message}</small>}
                        />
                        <small className="text-yellow-300 small">* Para efetuar quaisquer operações é necessário o TOKEN</small>
                    </div>
                <form method="POST" onSubmit={handleSubmit(onSubmit)} className="col-span-2 gap-4">
                    <div className="flex justify-between gap-4">
                        <div className="w-full bg-neutral-800 py-4 px-4 border-neutral-700 border rounded-lg shadow">
                            <div className="text-center py-4 bg-neutral-700 rounded-lg border-b border-neutral-600">
                                Atualizar Perfil
                            </div>
                            <div className="mt-5 px-4">
                                <div className="mb-4">
                                    <Label htmlFor="name" value="Nome" />
                                    <TextInput
                                        type="text"
                                        id="name"
                                        required={false}
                                        {...register('name', {
                                            required: false,
                                        })}
                                        color={errors.name ? "failure" : "gray"}
                                        placeholder={!user.name ? 'Sem nome definido' : ''}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="name"
                                        render={({ message }) => <small className="text-red-400">{message}</small>}
                                    />
                                </div>
                                {/* <div className="mb-4">
                                    <Label htmlFor="email" value="Email" />
                                    <TextInput
                                        type="email"
                                        id="email"
                                        required={false}
                                        {...register('email', {
                                            required: false,
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: "E-mail inválido",
                                            },
                                        })}
                                        color={errors.email ? "failure" : "gray"}
                                        placeholder={!user.email ? 'Sem e-mail definido' : ''}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="email"
                                        render={({ message }) => <small className="text-red-400">{message}</small>}
                                    />
                                </div> */}
                                <div className="mb-4 mx-auto">
                                    <Button type="submit">
                                        Atualizar
                                    </Button>
                                </div>

                            </div>
                        </div>
                        <div className="w-full bg-neutral-800 py-4 px-4 border-neutral-700 border rounded-lg shadow">
                            <div className="text-center py-4 bg-neutral-700 rounded-lg border-b border-neutral-600">
                                Alterar Senha
                            </div>
                            <div className="mt-5 px-4">
                                <div className="mb-4">
                                    <Label htmlFor="password" value="Nova senha" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        {...register("password", {
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
                                        placeholder="Nova senha"
                                        color={errors.password ? "failure" : "gray"}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="password"
                                        render={({ message }) => <small className="text-red-400">{message}</small>}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="passwordConfirmation" value="Confirme sua nova senha" />
                                    <TextInput
                                        type="password"
                                        id="passwordConfirmation"
                                        {...register('passwordConfirmation', {
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
                                        placeholder="Confirme sua nova senha"
                                        color={errors.passwordConfirmation ? "failure" : "gray"}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="passwordConfirmation"
                                        render={({ message }) => <small className="text-red-400">{message}</small>}
                                    />
                                </div>
                                <div className="mb-4 mx-auto">
                                    <Button type="submit">
                                        Atualizar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Profile;