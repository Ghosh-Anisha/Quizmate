function SubmissionCard({ submission}){
    return (
        <div className="card">
            {submission.submission.map((subm, index) => (
                <div className="input">
                    <label>{subm.title}</label>
                    {subm.type === "multioption-singleanswer" || subm.type === "multioption-multianswer"
                    ? subm.value.map((v, index) => <p key={index} className="li">- {v}</p>)
                    : subm.type === "file"
                    ? <a href={subm.value} download className="link">{subm.value}</a>
                    : <p>{subm.value}</p>}
                </div>
            ))}
            <p>Marks Obtained : {submission.marksObtained} / {submission.marksTotal}</p>
        </div>
    )
}

export default SubmissionCard