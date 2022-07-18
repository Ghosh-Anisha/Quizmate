import { Link } from 'react-router-dom'

function Home(){
    return <div>
        <div className="section">
            <img src="https://blush.design/api/download?shareUri=Vvv00XfNi&bg=ffffff&w=800&h=800&fm=png" alt="banner" />
            <div className="content">
                <h1>Create & Share <span>Forms</span> easily</h1>
                <p>Neural Corelates lets you create forms super easily! Create questions of various types with flexible schemes, Share the link of your form with others and see thier submissions along with analytics.</p>
                <Link to="/create" className="btn">Create your first form</Link>
            </div>
        </div>
        <div className="section">
            <div className="content">
                <h1>Neural Corelates features</h1>
                <p>
                    <span className="li">Easy to use</span>
                    <span className="li">Good analytics</span>
                    <span className="li">Free App</span>
                    <span className="li">No login required for taking part in the survey</span>
                </p>
            </div>
            <img src='https://blush.design/api/download?shareUri=KPFZytjWt&bg=ffffff&w=800&h=800&fm=png' alt="features" />
        </div>
    </div>
}

export default Home