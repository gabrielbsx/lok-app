import { ErrorMessage } from '@hookform/error-message';
import { AxiosError } from 'axios';
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react';
import{ useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Item, Package } from './';
import api from '../../../services/api';

type ResponseUpdatePackages = {
    statusCode: number;
    message: string;
    package: Package;
};

function Edit(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Package>();
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string>();
    const [item, setItem] = useState<Item>({
        id: undefined,
        name: undefined,
        effects: [
            { effect: undefined, value: undefined },
            { effect: undefined, value: undefined },
            { effect: undefined, value: undefined },
        ],
    });
    const { slug } = useParams();
    const navigate = useNavigate();

    useMemo(() => {
        const getPackageBySlug = async () => {
            const { data } = await api.get<{ package: Package }>(`/packages/getBySlug/${slug}`);

            if (!data.package) {
                toast.dark('Pacote não encontrada', {
                    type: toast.TYPE.ERROR,
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return;
            }

            setValue('name', data.package.name);
            setValue('price', data.package.price);
            setValue('bonus', data.package.bonus);
            setValue('donate', data.package.donate);
            if (Array.isArray(data.package.items)) {
              setItems(data.package.items);
            }
            setLoading(false);
        };

        getPackageBySlug();
    }, []);

    const goBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate('/admin/donate');
    };

    const onSubmit = async ({ name, price, donate, bonus }: Package): Promise<void> => {
        try {
            const { data } = await api.put<ResponseUpdatePackages>(`/packages/update/${slug}`, {
                name,
                price,
                donate,
                bonus,
                items,
            });

            if (data.statusCode === 200) {
                toast.success(data.message, {
                    type: toast.TYPE.SUCCESS,
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                return;
            }

            toast.dark(data.message, {
                type: toast.TYPE.ERROR,
                position: toast.POSITION.BOTTOM_RIGHT,
                delay: 1,
            });
        } catch (error: any | AxiosError) {
            setError(error.response.data.errors.map((err: any) => err.message).join(', '));

            toast.dark('Erro ao atualizar o pacote!', {
                type: 'error',
                position: 'bottom-right',
                delay: 1,
            });
        }
    };

    if (loading) {
        return (
            <>
                <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 my-2 text-center">
                    <Spinner size="xl" />
                </div>
            </>
        );
    }

    return (
        <>
            <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 my-2">
                <div>
                  {!!error && (
                      <div className="my-3 px-4 py-2 text-center rounded bg-red-500 border border-red-600 text-white">
                          {error}
                      </div>
                  )}
                  <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                      <div className="mb-4">
                          <Label htmlFor="name" value="Nome do Pacote" />
                          <TextInput
                              type="text"
                              id="name"
                              required={true}
                              {...register('name', {
                                  required: true
                              })}
                              color={errors.name ? "failure" : "gray"}
                          />
                          <ErrorMessage
                              errors={errors}
                              name="name"
                              render={({ message }) => <small className="text-red-400">{message}</small>}
                          />
                      </div>
                      <div className="mb-4">
                          <Label htmlFor="price" value="Preço" />
                          <TextInput
                              type="text"
                              id="price"
                              required={true}
                              {...register('price', {
                                  required: true,
                                  min: 0,
                              })}
                              color={errors.price ? "failure" : "gray"}
                          />
                          <ErrorMessage
                              errors={errors}
                              name="price"
                              render={({ message }) => <small className="text-red-400">{message}</small>}
                          />
                      </div>
                      <div className="mb-4">
                          <Label htmlFor="bonus" value="Bônus" />
                          <TextInput
                              type="number"
                              id="bonus"
                              required={true}
                              {...register('bonus', {
                                  required: true,
                                  min: 0,
                              })}
                              color={errors.bonus ? "failure" : "gray"}
                          />
                          <ErrorMessage
                              errors={errors}
                              name="bonus"
                              render={({ message }) => <small className="text-red-400">{message}</small>}
                          />
                      </div>
                      <div className="mb-4">
                          <Label htmlFor="donate" value="Donate" />
                          <TextInput
                              type="number"
                              id="donate"
                              required={true}
                              {...register('donate', {
                                  required: true,
                                  min: 0,
                              })}
                              color={errors.donate ? "failure" : "gray"}
                          />
                          <ErrorMessage
                              errors={errors}
                              name="donate"
                              render={({ message }) => <small className="text-red-400">{message}</small>}
                          />
                      </div>
                      <div className="mb-4">
                          <Label htmlFor="items" value="Itens" />
                          <div className="grid grid-cols-4 gap-2 mb-4">
                              {items.map((item, index) => (
                                  <div key={index} className="flex gap-2 justify-end">
                                      <div className="bg-neutral-700 py-2 px-6 rounded">
                                          {item.name}
                                      </div>
                                      <Button
                                          color="failure"
                                          onClick={() => {
                                              let itemWithoutDeletedItem = items;
                                              itemWithoutDeletedItem.splice(index, 1);
                                              setItems([ ...itemWithoutDeletedItem ]);
                                          }}
                                      >
                                          Deletar
                                      </Button>
                                  </div>
                              ))}
                          </div>
                          <div className="grid grid-cols-1 justify-center gap-4 mb-3">
                              <div className="flex gap-1 justify-center">
                                  <div className="gap-1 flex">
                                      <TextInput
                                          type="string"
                                          value={item.name ?? ''}
                                          placeholder="ITEM NAME"
                                          onChange={(event) => {
                                              const itemCpy = item;
                                              itemCpy.name = event.target.value;
                                              setItem({ ...itemCpy });
                                          }}
                                      />
                                      <TextInput
                                          type="number"
                                          value={item.id ?? ''}
                                          placeholder="ITEM ID"
                                          onChange={(event) => {
                                              const itemCpy = item;
                                              itemCpy.id = parseInt(event.target.value);
                                              setItem({ ...itemCpy });
                                          }}
                                      />
                                  </div>
                                  {[1, 2, 3].map((value, index) => (
                                      <div key={index} className="gap-1 flex">
                                          <TextInput
                                              type="number"
                                              value={item.effects[value - 1].effect ?? ''}
                                              placeholder={`EFF${value}`}
                                              onChange={(event) => {
                                                  const itemCpy = item;
                                                  itemCpy.effects[value - 1].effect = parseInt(event.target.value);
                                                  setItem({ ...itemCpy });
                                              }}
                                          />
                                          <TextInput
                                              type="number"
                                              value={item.effects[value - 1].value ?? ''}
                                              placeholder={`EFFV${value}`}
                                              onChange={(event) => {
                                                  const itemCpy = item;
                                                  itemCpy.effects[value - 1].value = parseInt(event.target.value);
                                                  setItem({ ...itemCpy });
                                              }}
                                          />
                                      </div>
                                  ))}
                                  <Button
                                      onClick={() => {
                                          setItems([...items, item]);
                                          setItem({
                                              id: undefined,
                                              name: '',
                                              effects: [
                                                  { effect: undefined, value: undefined },
                                                  { effect: undefined, value: undefined },
                                                  { effect: undefined, value: undefined },
                                              ],
                                          });
                                      }}
                                  >
                                      Adicionar
                                  </Button>
                              </div>
                          </div>
                      </div>
                      <div className="mb-4 mx-auto flex">
                          <div className="mx-2">
                              <Button type="submit">
                                  Alterar
                              </Button>
                          </div>
                          <div className="mx-2">
                              <Button color="warning" onClick={goBack} type="submit">
                                  Voltar
                              </Button>
                          </div>
                      </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Edit;