import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { getSubmissions, getStatistics } from "../db"

import  {randomColor} from '../utils/randomColor';

import SubmissionCard from "../components/SubmissionCard"
import { ShowData } from '../components/Statistics/statistics.components';

function Submissions(){
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    const [submissions, setSubmissions] = useState([])
    const [stats, setStats] = useState();

    const { id } = useParams()

    useEffect(() => {
        if(!localStorage.getItem('gfc-user')) return
        const fetchData = async () => {
            try{
                let sbmns = await getSubmissions(id)
                let stats = await getStatistics(id);
                setSubmissions(sbmns)
                setStats(stats);
                setLoading(false)
            }catch(e){
                setLoading(false)
                setMsg(e.message)
            }
        }
        fetchData()
    }, [id])

    const displayStats = () => {
        console.log(stats);
        const fullData = [];
        for (let key in stats) {
            if (key == "marksObtained" || key == "Enter your email") {
                continue;
            }
            let q = key;
            const data = [];
            for (let key2 in stats[key]) {
                let temp = {};
                temp["title"] = key2;
                temp["value"] = stats[key][key2];
                temp["color"] = randomColor();
                data.push(temp);
            }
            fullData.push({title: q, data:data});
        }
        console.log(fullData);
        return (
            <ShowData data={fullData} />
        );
    }

    return (
        <div>
            <h1 className="heading mb-1">Form Submissions</h1>
            { loading ? <p className="text-center mt-1"><span className="spinner"></span></p>
            : msg ? <h3 className="msg mt-1">{msg}</h3>
            : submissions.length > 0 ? (
                <>
                    <div className="cards-container submissions">
                        { submissions.map((subm, index) => <SubmissionCard key={index} submission={subm.submission} /> )}
                    </div>
                    {displayStats()}
                </>
            ) : <h3 className="msg mt-1">No submissions yet</h3>}

        </div>
    )
}

export default Submissions