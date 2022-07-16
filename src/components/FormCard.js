import { useState} from 'react'
import { MdOutlineContentCopy, MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';

import {AiOutlineFundView} from 'react-icons/ai';
import {GrOverview} from 'react-icons/gr';
import { Link } from 'react-router-dom'

import { getDateFromMillis } from '../utils'
import { deleteForm } from "../db"

import 'react-toastify/dist/ReactToastify.css';


import RenderPlainForm from "../components/RenderPlainForm"

function FormCard({ form, onDelete }){
    const [preview, setPreview] = useState(false)
    const [loading, setLoading] = useState(false)



    const handleDelete = async () => {

        if(!window.confirm("Are you sure you want to delete this form?")) return
        setLoading(true)
        toast.info("Form deleted successfully")
        await deleteForm(form.id)
        setLoading(false)
        onDelete(form.id)
    }

    const onClickHandler = async () => {
        await navigator.clipboard.writeText(`${window.location.origin}/fill/${form.id}`);
        toast.success("Link copied to clipboard");
    }

    return (
        <div className="card">
            <h2 className="title mb-1">
                <span>{form.title}</span>
                <span className="card-date">{getDateFromMillis(form.createdAt)}</span>
            </h2>

        <div>
        <a href={`${window.location.origin}/fill/${form.id}`} class="button" className='btn'>Take Quiz</a> &nbsp; &nbsp;
        <MdOutlineContentCopy onClick={()=>onClickHandler()}/>         <ToastContainer floatingTime={5000}/>

        </div>
            <p className="card-nav">
                <span className="nav-item" onClick={() => setPreview(true)}><GrOverview/></span>
                <Link to={"/submissions/" + form.id} className="nav-item"><AiOutlineFundView/></Link>
                <span className="nav-item" onClick={handleDelete}>{ loading ? <span className="spinner red"></span> : <MdDelete/>} </span>
            </p>
            {preview && (
                <div className="modal">
                    <div className="modal-content preview">
                        <span className="close" onClick={() => setPreview(false)}>&times;</span>
                        <RenderPlainForm model={form} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default FormCard