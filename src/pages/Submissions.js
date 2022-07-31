import { useState, useEffect, useRef } from 'react'
// heroku
import { useParams } from 'react-router-dom'

import { getSubmissions, getStatistics } from "../db"

import {randomColor} from '../utils/randomColor';

import SubmissionCard from "../components/SubmissionCard"
import { CSVLink } from 'react-csv';
import { ShowData } from '../components/Statistics/statistics.components';

function Submissions(){
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    const [submissions, setSubmissions] = useState([])
    const [stats, setStats] = useState();
    const [csvHeaders, setCsvHeaders] = useState('');
    const [csvData, setCsvData] = useState('');
    const csv = useRef(null);

    const { id } = useParams()

    const getCSV = async (sbmns) => {
        let titles = [];
        let answers = [];
        let csvAnswers = '';
        let csvTitles = '';
        for(let i = 0; i < sbmns[0]["submission"].length; ++i){
            titles.push(sbmns[0]["submission"][i]["title"]);
        }
        for(let i = 0; i < sbmns[0]["submission"].length; ++i){
            answers.push(sbmns[0]["submission"][i]["value"]);
            answers.push(sbmns[0]["status"][i]);
        }
        
        csvTitles  += titles.join(',') + ',time\n';
        csvAnswers += answers.join(',') + '\n';
        console.log(csvTitles, csvAnswers);
        setCsvData(csvTitles + csvAnswers);
        //setCsvHeaders(csvTitles);
    }

    useEffect(() => {
        if(!localStorage.getItem('gfc-user')) return
        const fetchData = async () => {
            try{
                let sbmns = await getSubmissions(id);
                console.log(sbmns);
                let stats = await getStatistics(id);
                let csvStr = '';
                setSubmissions(sbmns)
                setStats(stats);
                setLoading(false);
            }catch(e){
                setLoading(false)
                setMsg(e.message)
            }
        }
        fetchData()
        getSubmissions(id).then(sbmns => {
            getCSV(sbmns);
        })
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
        //console.log(toCsv(data));
        return (
            <ShowData data={fullData} />
        );
    }

    const downloadReport = async () => {
        csv.current.link.click();
    }

    return (
        <div>
            <h1 className="heading mb-1">Form Submissions</h1>
            { loading ? <p className="text-center mt-1"><span className="spinner"></span></p>
            : msg ? <h3 className="msg mt-1">{msg}</h3>
            : submissions.length > 0 ? (
                <>
                    <div className="cards-container submissions">
                        { submissions.map((subm, index) => <SubmissionCard key={index} submission={subm} /> )}
                    </div>
                    {displayStats()}
                </>
            ) : <h3 className="msg mt-1">No submissions yet</h3>}
            <div className="cards-contaner submissions"></div>
            <button className='btn' type="button" value="Export to Excel" onClick={downloadReport} ><span>Export to Excel</span></button>
            <CSVLink
                headers={csvHeaders}
                filename={`${id}.csv`}
                data={csvData}
                ref={csv}
            />
        </div>
    )
}

export default Submissions //aa