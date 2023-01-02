import React from 'react';

interface IErrorMessage {
    message: string;
    where: string;
}

function ErrorMessage({ where, message }: IErrorMessage): JSX.Element {
    console.log('On Error Message Component', message);

    return (
        <div className="px-4 py-4 text-center rounded-lg bg-red-300 text-red-900 uppercase my-4">
            {message}, aguarde para que {where} esteja pronto.
        </div>
    );
}

export default ErrorMessage;