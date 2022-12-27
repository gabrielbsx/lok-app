export default {
    theme: {
        navbar: {
            // base: 'border-neutral-200 bg-white border-2 border-t-0 px-2 py-4 dark:border-neutral-900 dark:bg-neutral-800 sm:px-4 shadow-lg shadow-neutral-800 z-10',
            base: 'bg-[#2B2B28] px-2 py-4 sm:px-4 shadow-neutral-800 z-10',
            rounded: {
                on: '',
                off: '',
            },
            bordered: {
                on: 'border',
                off: '',
            },
            inner: {
                base: 'mx-auto flex flex-wrap items-center justify-between',
                fuild: {
                    on: '',
                    off: 'container',
                },
            },
            brand: 'flex items-center',
            collapse: {
                base: 'w-full md:block md:w-auto',
                list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium',
                hidden: {
                    on: 'hidden',
                    off: '',
                },
            },
            link: {
                base: 'block py-2 pr-4 pl-3 md:p-0',
                active: {
                    on: 'bg-neutral-900 text-white dark:text-white md:bg-neutral-900 md:py-2 md:px-4 md:my-auto md:rounded md:inline md:mx-0 md:text-neutral-200',
                    off: 'border-b border-neutral-100 text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-neutral-300 md:dark:hover:bg-transparent md:dark:hover:text-white',
                },
                disabled: {
                    on: 'text-neutral-400 hover:cursor-not-allowed dark:text-neutral-600',
                    off: '',
                },
            },
            toggle: {
                base: 'ml-3 inline-flex items-center rounded-lg p-2 text-sm text-neutral-500 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600 md:hidden',
                icon: 'h-6 w-6 shrink-0',
            },
        },
        dropdown: {
            floating: {
                target: 'w-fit hover:bg-transparent',
                base: 'absolute inline-block rounded-lg py-2 px-3 text-sm font-medium shadow-sm',
                animation: 'transition-opacity',
                hidden: 'invisible opacity-0',
                style: {
                    dark: 'bg-neutral-900 text-white dark:bg-neutral-700',
                    light: 'border border-neutral-200 bg-white text-neutral-900',
                    auto: 'z-10 border border-neutral-200 bg-white text-neutral-900 dark:border-none dark:bg-neutral-700 dark:text-white',
                },
                content: 'relative z-20',
                arrow: {
                    base: 'absolute z-10 h-2 w-2 rotate-45',
                    style: {
                        dark: 'bg-neutral-900 dark:bg-neutral-700',
                        light: 'bg-white',
                        auto: 'bg-white dark:bg-neutral-700',
                    },
                    placement: '-4px',
                },
            },
            arrowIcon: 'ml-2 h-4 w-4',
            inlineWrapper: 'flex items-center',
            content: 'py-1',
        },
        listGroup: {
            base: 'list-none rounded-lg border border-neutral-200 bg-white text-sm font-medium text-neutral-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white',
            item: {
                active: {
                    off: 'hover:bg-neutral-100 hover:text-blue-700 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:border-neutral-600 dark:hover:bg-neutral-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-neutral-500',
                    on: 'bg-blue-700 text-white dark:bg-neutral-800',
                },
                base: 'flex w-full cursor-pointer border-b border-neutral-200 py-2 px-4 first:rounded-t-lg last:rounded-b-lg last:border-b-0 dark:border-neutral-600',
                href: {
                    off: '',
                    on: '',
                },
                icon: 'mr-2 h-4 w-4 fill-current',
            },
        },
        footer: {
            base: 'w-full rounded-lg bg-white shadow dark:bg-neutral-800 md:flex md:items-center md:justify-between',
            container: 'w-full p-6',
            bgDark: 'bg-neutral-800',
            groupLink: {
                base: 'flex flex-wrap text-sm text-neutral-500 dark:text-white',
                link: {
                    base: 'last:mr-0 md:mr-6',
                    href: 'hover:underline',
                },
                col: 'flex-col space-y-4',
            },
            icon: {
                base: 'text-neutral-500 dark:hover:text-white',
                size: 'h-5 w-5',
            },
            title: {
                base: 'mb-6 text-sm font-semibold uppercase text-neutral-500 dark:text-white',
            },
            divider: {
                base: 'w-full my-6 border-neutral-200 sm:mx-auto dark:border-neutral-700 lg:my-8',
            },
            copyright: {
                base: 'text-sm text-neutral-500 dark:text-neutral-400 sm:text-center',
                href: 'ml-1 hover:underline',
                span: 'ml-1',
            },
            brand: {
                base: 'mb-4 flex items-center sm:mb-0',
                img: 'mr-3 h-8',
                span: 'self-center whitespace-nowrap text-2xl font-semibold text-neutral-800 dark:text-white',
            },
        },
        card: {
            base: 'flex rounded-lg border border-neutral-200 bg-white shadow-md dark:border-neutral-700 dark:bg-neutral-800',
            children: 'flex h-full flex-col justify-center gap-4 p-6',
            horizontal: {
                off: 'flex-col',
                on: 'flex-col md:max-w-xl md:flex-row',
            },
            href: 'hover:bg-neutral-100 dark:hover:bg-neutral-700',
            img: {
                base: '',
                horizontal: {
                    off: 'rounded-t-lg',
                    on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
                },
            },
        },
        carousel: {
            base: 'relative bg-neutral-800 border-4 border-neutral-800 rounded-lg h-full w-full',
            indicators: {
                active: {
                    off: 'bg-white/50 hover:bg-white dark:bg-neutral-600/50 border border-neutral-500 dark:hover:bg-neutral-800',
                    on: 'bg-white dark:bg-neutral-500 border border-neutral-300',
                },
                base: 'h-3 w-3 rounded-full',
                wrapper: 'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3',
            },
            item: {
                base: 'absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2',
                wrapper: 'w-full flex-shrink-0 transform cursor-grab snap-center',
            },
            control: {
                base: 'inline-flex h-8 w-8 items-center justify-center border border-neutral-600/50 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-neutral-700/50 dark:group-hover:bg-neutral-800/60 dark:group-focus:ring-neutral-800/70 sm:h-10 sm:w-10',
                icon: 'h-5 w-5 text-white dark:text-neutral-600 sm:h-6 sm:w-6',
            },
            leftControl: 'absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none',
            rightControl: 'absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none',
            scrollContainer: {
                base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-xl',
                snap: 'snap-x',
            },
        },
        formControls: {
            helperText: {
                base: 'mt-2 text-sm',
                colors: {
                    gray: 'text-neutral-500 dark:text-neutral-400',
                    info: 'text-blue-700 dark:text-blue-800',
                    success: 'text-green-600 dark:text-green-500',
                    failure: 'text-red-600 dark:text-red-500',
                    warning: 'text-yellow-500 dark:text-yellow-600',
                },
            },
            label: {
                base: 'text-sm font-medium',
                colors: {
                    default: 'text-neutral-900 dark:text-neutral-300',
                    info: 'text-blue-500 dark:text-blue-600',
                    failure: 'text-red-700 dark:text-red-500',
                    warning: 'text-yellow-500 dark:text-yellow-600',
                    success: 'text-green-700 dark:text-green-500',
                },
                disabled: 'opacity-50',
            },
            radio: {
                base: 'h-4 w-4 border border-neutral-300 focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:focus:bg-blue-600 dark:focus:ring-blue-600',
            },
            checkbox: {
                base: 'h-4 w-4 rounded border border-neutral-300 bg-neutral-100 focus:ring-2 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-blue-600',
            },
            textInput: {
                base: 'flex',
                addon: 'inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-200 px-3 text-sm text-neutral-900 dark:border-neutral-600 dark:bg-neutral-600 dark:text-neutral-400',
                field: {
                    base: 'relative w-full',
                    icon: {
                        base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
                        svg: 'h-5 w-5 text-neutral-500 dark:text-neutral-400',
                    },
                    input: {
                        base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
                        sizes: {
                            sm: 'p-2 sm:text-xs',
                            md: 'p-2.5 text-sm',
                            lg: 'sm:text-md p-4',
                        },
                        colors: {
                            gray: 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            info: 'border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-700 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-400 dark:bg-blue-100 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            failure: 'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
                            warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
                            success: 'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
                        },
                        withIcon: {
                            on: 'pl-10',
                            off: '',
                        },
                        withAddon: {
                            on: 'rounded-r-lg',
                            off: 'rounded-lg',
                        },
                        withShadow: {
                            on: 'shadow-sm dark:shadow-sm-light',
                            off: '',
                        },
                    },
                },
            },
            fileInput: {
                base: 'flex',
                field: {
                    base: 'relative w-full',
                    input: {
                        base: 'rounded-lg block w-full border disabled:cursor-not-allowed disabled:opacity-50',
                        sizes: {
                            sm: 'sm:text-xs',
                            md: 'text-sm',
                            lg: 'sm:text-md',
                        },
                        colors: {
                            gray: 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            info: 'border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-700 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-400 dark:bg-blue-100 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            failure: 'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
                            warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
                            success: 'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
                        },
                    },
                },
            },
            toggleSwitch: {
                base: 'group relative flex items-center rounded-lg focus:outline-none',
                active: {
                    on: 'cursor-pointer',
                    off: 'cursor-not-allowed opacity-50',
                },
                toggle: {
                    base: 'toggle-bg h-6 w-11 rounded-full border group-focus:ring-4 group-focus:ring-blue-500/25',
                    checked: {
                        on: 'border-blue-700 bg-blue-700 after:translate-x-full after:border-white',
                        off: 'border-neutral-200 bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-700',
                    },
                },
                label: 'ml-3 text-sm font-medium text-neutral-900 dark:text-neutral-300',
            },
            textarea: {
                base: 'block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50',
                colors: {
                    gray: 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                    info: 'border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-700 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-400 dark:bg-blue-100 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                    failure: 'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
                    warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
                    success: 'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
                },
                withShadow: {
                    on: 'shadow-sm dark:shadow-sm-light',
                    off: '',
                },
            },
            select: {
                base: 'flex',
                addon: 'inline-flex items-center rounded-l-md border border-r-0 border-neutral-300 bg-neutral-200 px-3 text-sm text-neutral-900 dark:border-neutral-600 dark:bg-neutral-600 dark:text-neutral-400',
                field: {
                    base: 'relative w-full',
                    icon: {
                        base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
                        svg: 'h-5 w-5 text-neutral-500 dark:text-neutral-400',
                    },
                    select: {
                        base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
                        withIcon: {
                            on: 'pl-10',
                            off: '',
                        },
                        withAddon: {
                            on: 'rounded-r-lg',
                            off: 'rounded-lg',
                        },
                        withShadow: {
                            on: 'shadow-sm dark:shadow-sm-light',
                            off: '',
                        },
                        sizes: {
                            sm: 'p-2 sm:text-xs',
                            md: 'p-2.5 text-sm',
                            lg: 'sm:text-md p-4',
                        },
                        colors: {
                            gray: 'bg-neutral-50 border-neutral-300 text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            info: 'border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-700 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-400 dark:bg-blue-100 dark:focus:border-blue-500 dark:focus:ring-blue-500',
                            failure: 'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
                            warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
                            success: 'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
                        },
                    },
                },
            },
        },
        pagination: {
            base: '',
            layout: {
                table: {
                    base: 'text-sm text-neutral-700 dark:text-neutral-400',
                    span: 'font-semibold text-neutral-900 dark:text-white',
                },
            },
            pages: {
                base: 'xs:mt-0 mt-2 inline-flex items-center -space-x-px',
                showIcon: 'inline-flex',
                previous: {
                    base: 'ml-0 rounded-l-lg border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white',
                    icon: 'h-5 w-5',
                },
                next: {
                    base: 'rounded-r-lg border border-neutral-300 bg-white py-2 px-3 leading-tight text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white',
                    icon: 'h-5 w-5',
                },
                selector: {
                    base: 'w-12 border border-neutral-300 bg-white py-2 leading-tight text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white',
                    active: 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white',
                },
            },
        },
        progress: {
            base: 'w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700',
            label: 'mb-1 flex justify-between font-medium dark:text-white',
            bar: 'flex items-center justify-center rounded-full text-center font-medium leading-none text-blue-100',
            color: {
                dark: 'bg-neutral-600 dark:bg-neutral-300',
                blue: 'bg-blue-600',
                red: 'bg-red-600 dark:bg-red-500',
                green: 'bg-green-600 dark:bg-green-500',
                yellow: 'bg-yellow-400',
                indigo: 'bg-indigo-600 dark:bg-indigo-500',
                purple: 'bg-purple-600 dark:bg-purple-500',
                gray: 'bg-neutral-600 dark:bg-neutral-500',
            },
            size: {
                sm: 'h-1.5',
                md: 'h-2.5',
                lg: 'h-4',
                xl: 'h-6',
            },
        },
        toast: {
            base: 'flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-neutral-500 shadow dark:bg-neutral-800 dark:text-neutral-400',
            closed: 'opacity-0 ease-out',
            removed: 'hidden',
            toggle: {
                base: 'z-10 -mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-2 focus:ring-neutral-300 dark:bg-neutral-800 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-white',
                icon: 'h-5 w-5 shrink-0',
            },
        },
        modal: {
            base: 'fixed top-0 right-0 left-0 z-50 h-modal overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
            show: {
                on: 'flex bg-neutral-900 bg-opacity-50 dark:bg-opacity-80',
                off: 'hidden',
            },
            content: {
                base: 'relative h-full w-full p-4 md:h-auto',
                inner: 'relative rounded-lg bg-white shadow dark:bg-neutral-700',
            },
            body: {
                base: 'p-6',
                popup: 'pt-0',
            },
            header: {
                base: 'flex items-start justify-between rounded-t dark:border-neutral-600 border-b p-5',
                popup: '!p-2 !border-b-0',
                title: 'text-xl font-medium text-neutral-900 dark:text-white',
                close: {
                    base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-neutral-400 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-600 dark:hover:text-white',
                    icon: 'h-5 w-5',
                },
            },
            footer: {
                base: 'flex items-center space-x-2 rounded-b border-neutral-200 p-6 dark:border-neutral-600',
                popup: 'border-t',
            },
            sizes: {
                sm: 'max-w-sm',
                md: 'max-w-md',
                lg: 'max-w-lg',
                xl: 'max-w-xl',
                '2xl': 'max-w-2xl',
                '3xl': 'max-w-3xl',
                '4xl': 'max-w-4xl',
                '5xl': 'max-w-5xl',
                '6xl': 'max-w-6xl',
                '7xl': 'max-w-7xl',
            },
            positions: {
                'top-left': 'items-start justify-start',
                'top-center': 'items-start justify-center',
                'top-right': 'items-start justify-end',
                'center-left': 'items-center justify-start',
                center: 'items-center justify-center',
                'center-right': 'items-center justify-end',
                'bottom-right': 'items-end justify-end',
                'bottom-center': 'items-end justify-center',
                'bottom-left': 'items-end justify-start',
            },
        },
        accordion: {
            base: 'divide-y divide-neutral-200 border-neutral-200 dark:divide-neutral-700 dark:border-neutral-700',
            content: {
                base: 'py-5 px-5 last:rounded-b-lg dark:bg-neutral-900 first:rounded-t-lg',
            },
            flush: {
                off: 'rounded-lg border',
                on: 'border-b',
            },
            title: {
                arrow: {
                    base: 'h-6 w-6 shrink-0',
                    open: {
                        off: '',
                        on: 'rotate-180',
                    },
                },
                base: 'flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium text-neutral-500 dark:text-neutral-400',
                flush: {
                    off: 'hover:bg-neutral-100 focus:ring-4 focus:ring-neutral-200 dark:hover:bg-neutral-800 dark:focus:ring-neutral-800',
                    on: '!bg-transparent dark:!bg-transparent',
                },
                heading: '',
                open: {
                    off: '',
                    on: 'text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:text-white',
                },
            },
        },
    },
    dark: true,
};