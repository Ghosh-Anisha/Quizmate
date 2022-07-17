import { PieChart } from 'react-minimal-pie-chart';

export const StatisticsPieChart = (props) => {
    return (
        <PieChart data={props.data} />
    );
};

export const ShowData = (props) => {
    return (
        <div>
            {
                props.data.map((p) => 
                    <div>
                        <p>{p.title}</p>
                        <StatisticsPieChart data={p.data} />
                    </div>
                )
            }
        </div>
    );
}