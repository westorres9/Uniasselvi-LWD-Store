import './styles.css';

type Props = {
    id: number,
    onDialogAnswer: Function
}
export default function DialogConfirmation( { id, onDialogAnswer } : Props ) {

    return (
        <div className='dialog-background' onClick={() => onDialogAnswer(false, id)}>
            <div className="dialog-confirmation-container" onClick={(event) => event.stopPropagation()}>
            <h1>Tem Certeza?</h1>
            <div className="dialog-confirmation-button">
                <button onClick={() => onDialogAnswer(false, id)} className='btn btn-outline-secondary'>Nao</button>
                <button onClick={() => onDialogAnswer(true, id)} className='btn btn-danger text-white'>Sim</button>
            </div>
        </div>
        </div>
    )
}