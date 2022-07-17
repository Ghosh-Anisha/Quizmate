import { PieChart } from 'react-minimal-pie-chart';
import Histogram from 'react-chart-histogram';

export const StatisticsPieChart = (props) => {

    // const data= [
    //     { title: 'One', value: 10, color: '#E38627' },
    //     { title: 'Two', value: 15, color: '#C13C37' },
    //     { title: 'Three', value: 20, color: '#6A2135' },
    // ];

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

export const StatisticsHistogram = (props) => {
    // const labels = ['2016', '2017', '2018'];
    // const data = [324, 45, 672];
    const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };

    return (
        <div>
        <Histogram
            xLabels={props.labels}
            yValues={props.data}
            width='400'
            height='200'
            options={options}
        />
        </div>
    )
};
