import { ErrorMessage } from "@hookform/error-message";
import axios, { AxiosError } from "axios";
import { Alert, Button, FileInput, Label, Select, Spinner, TextInput } from "flowbite-react";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IErrorMessage, IUser } from "../@types/User";
import api from "../services/api";

export type GuildmarkData = {
    name: string;
    guild: number;
    guildmark: FileList;
};

export type IGuild = {
    id: number;
    name: string;
    fame: number;
    kingdom: 'Akelonia' | 'Hekalotia';
    created_at: Date;
    updated_at: Date;
};

export type ItemEffect = {
    effect: number;
    value: number;
};

export type Item = {
    id: number;
    effects: ItemEffect[];
};

export type Character = {
    id: number;
    user_id: number;
    guild_id: number;
    slot: number;
    nick: string;
    level: number;
    class: 'TransKnight' | 'Foema' | 'BeastMaster' | 'Huntress';
    evolution: 'Mortal' | 'Arch' | 'Celestial' | 'SubCelestial' | 'Celestial/SubCelestial';
    guild_level: number;
    experience: number;
    frags: number;
    inventory?: Item[];
    equipment?: Item[];
    guild: IGuild;
    user: IUser;
    created_at: Date;
    updated_at: Date;
};

export type GuildResponse = {
    statusCode: number;
    characters: Character;
};

export type GuildmarksResponse = {
    statusCode: number;
    guildmarks: string[];
}

function Guilmark(): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [guild, setGuild] = useState<IGuild[]>([]);
    const [guildmarkShow, setGuildmarkShow] = useState<boolean>(false);
    const [guildSelected, setGuildSelected] = useState<string>();
    const [guildmarks, setGuildmarks] = useState<string[]>([]);
    const guildRef = useRef<any>();

    useMemo(() => {
        const getGuild = async () => {
            try {
                let errors: string = '';
                setLoading(true);
                const { data } = await api.get<GuildResponse>('/guilds/guild');
                if (data.statusCode === 200) {
                    const { characters } = data;
                    setGuild([characters.guild]);
                }
            } catch (error) {
                error as Error | AxiosError;
            } finally {
                setLoading(false);
            }
        };

        const getGuildmarks = async () => {
            try {
                const { data } = await api.get<GuildmarksResponse>('/guilds/marks');
                setGuildmarks(data.guildmarks);
            } catch (error) {

            } finally {

            }
        };
        getGuild();
        getGuildmarks();
    }, []);

    const onSubmit = async ({ guild, guildmark }: Partial<GuildmarkData>) => {
        setError('');
        const mark = guildmark!.item(0);

        if (!mark && !guildSelected) {
            setError("Você precisa adicionar uma guildmark");
            return;
        }

        const formData = new FormData();

        if (mark) {
            formData.append("guildmark", mark);
        }
        if (guildSelected) {
            formData.append("guildmarkSelected", guildSelected);
        }

        formData.append("guild", guild!.toString());

        try {
            const { data } = await api.put('/guilds/guildmark', formData);

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
        } catch (error: any | AxiosError) {
            error as Error | AxiosError<IErrorMessage>;

            if (Array.isArray(error.response.data.errors)) {
                setError(error.response.data.errors.map((error: Partial<IErrorMessage>) => error.message).join(', '));
            }

            setLoading(false);
        }
    };

    const onHandleGuildmark = (guildmark: string) => setGuildSelected(guildmark.replace('../../', '/'));

    return (
        <>
            <article className="bg-neutral-800 px-3 py-4 border border-neutral-700 rounded-lg">
                <header className="text-center font-bold py-3 rounded-lg bg-neutral-700 border border-neutral-600">
                    <h1>Guildmark</h1>
                </header>
                <div className="px-4 py-6 container">
                    {guildSelected && (
                        <div className="mb-6 mx-auto justify-center flex">
                            <div className="">
                                <img width={50} src={`https://api.wydimperial.com/guildmark/${guildSelected}`} />
                            </div>
                        </div>
                    )}
                    <div className="mb-6 mx-auto justify-center flex flex-col">
                        <div className="flex mx-auto">
                            <Button
                                onClick={() => setGuildmarkShow(!guildmarkShow)}
                                color={guildmarkShow ? 'failure' : 'success'}
                            >
                                {guildmarkShow ? 'Fechar Coleção de Guildmarks' : 'Abrir Coleção de Guildmarks'}
                            </Button>
                        </div>
                        {guildmarkShow && (
                            <div className="my-2 flex flex-wrap items-center">
                                <img ref={guildRef} />
                                {guildmarks.map((guildmark, index) => {
                                    return (
                                        <div key={index}>
                                            <a
                                                key={index}
                                                className="cursor-pointer"
                                                onClick={() => onHandleGuildmark(guildmark)}
                                            >
                                                <img
                                                    key={index}
                                                    onMouseEnter={(event) => {
                                                        const src = event.currentTarget.src;
                                                        guildRef.current!.src = src;
                                                        guildRef.current!.className = 'fixed top-[0] right-[0] w-[200px]';
                                                    }}
                                                    onMouseOut={() => {
                                                        guildRef.current.className = 'hidden';
                                                    }}
                                                    className="hover:border-[10px] hover:border-white"
                                                    width={30}
                                                    src={`https://api.wydimperial.com/guildmark/${guildmark}`}
                                                />
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {loading ? (
                        <div className="text-center">
                            <Spinner size="xl" />
                        </div>
                    ) : (
                        guild.length ? (
                            <form method="POST" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    {guild.map(({ id, name }) => (
                                        <div className="flex items-center">
                                            <img
                                                width={30}
                                                className="border border-neutral-900 rounded"
                                                src={!guildSelected ? `https://api.wydimperial.com/img_guilds/b0${1000000 + id}.bmp?${new Date().getTime()}` : `https://api.wydimperial.com/guildmark/${guildSelected}`}
                                                alt={`-`}
                                            />
                                            <div className="ml-2 text-xs">
                                                Guildmark de {name} atual.
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mb-3">
                                    {error && (
                                        <div className="mb-4">
                                            <Alert color="failure">{error}</Alert>
                                        </div>
                                    )}

                                    <div className="mb-2 flex items-center justify-between">
                                        <Label
                                            htmlFor="guild"
                                            value="Sua Guilda"
                                        />
                                    </div>
                                    <Select
                                        id="guild"
                                        {...register("guild", {
                                            required: "Campo de guilda obrigatório",
                                        })}
                                        required={true}
                                        color={errors.guild ? "failure" : "gray"}
                                    >
                                        <option>Selecione uma guilda</option>
                                        {guild.map(({ id, name }, index) => (
                                            <option key={index} value={id}>{name}</option>
                                        ))}
                                    </Select>
                                    <ErrorMessage
                                        errors={errors}
                                        name="guild"
                                        render={({ message }) => <small className="text-red-400">{message}</small>}
                                    />
                                </div>
                                <div className="mb-3">
                                    <div className="mb-2 flex items-center justify-between">
                                        <Label
                                            htmlFor="guildmark"
                                            value="Guildmark"
                                        />
                                    </div>
                                    <FileInput
                                        id="guildmark"
                                        {...register("guildmark", {
                                            // required: "Campo de guildmark obrigatório",
                                            validate: (value) => {
                                                if (value.length === 0) {
                                                    return true;
                                                }
                                                if (value.length !== 1) {
                                                    return "Selecione apenas um guildmark";
                                                }
                                                const guildmark = value.item(0);
                                                if (guildmark.type !== "image/bmp") {
                                                    return "Arquivo deve ser do tipo BMP";
                                                }
                                                return true;
                                            },
                                        })}
                                        color={errors.guildmark ? "failure" : "gray"}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="guildmark"
                                        render={({ message }) => <small className="text-red-400">{message}</small>}
                                    />
                                </div>
                                <div className="mx-auto">
                                    <Button type="submit">
                                        Enviar
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <>
                                {error && (
                                    <div className="mb-4">
                                        <Alert color="failure">{error}</Alert>
                                    </div>
                                )}
                            </>
                        )
                    )}
                </div>
            </article>
        </>
    );
}

export default Guilmark;