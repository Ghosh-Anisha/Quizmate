import { PieChart } from 'react-minimal-pie-chart';

export const StatisticsPieChart = (props) => {
    return (
        <PieChart    animation
        animate={true}
        animationDuration={3000}
        animationEasing="ease-out"
        center={[50, 50]}
      data={props.data} labelPosition={50}
      lengthAngle={360}
      radius={20}
      viewBoxSize={[100, 100]}/>
    );
};

export const ShowData = (props) => {
    return (
        <div>
            {
                props.data.map((p) => 
                    <div>
                        <p className='section'>Answer distribution: {p.title}</p>
                        <StatisticsPieChart data={p.data} />
                    </div>
                )
            }
        </div>
    );
}