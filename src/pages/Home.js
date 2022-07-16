import { Link } from 'react-router-dom'

function Home(){
    return <div>
        <div className="section">
            <img src="https://blush.design/api/download?shareUri=Vvv00XfNi&bg=ffffff&w=800&h=800&fm=png" alt="banner" />
            <div className="content">
                <h1>Create & Share <span>Quizzes</span> easily</h1>
                <p>Quizmate lets you create quizzes super easily! Create questions of various types with flexible marking schemes, Share the link of your form with others and see thier submissions.</p>
                <Link to="/create" className="btn">Create your first quiz</Link>
            </div>
        </div>
        <div className="section">
            <div className="content">
                <h1>Quizmate features</h1>
                <p>
                    <span className="li">Easy to use</span>
                    <span className="li">Good analytics</span>
                    <span className="li">Free App</span>
                    <span className="li">No login required for taking part in the quiz</span>
                </p>
            </div>
            <img src='https://blush.design/api/download?shareUri=KPFZytjWt&bg=ffffff&w=800&h=800&fm=png' alt="features" />
        </div>
    </div>
}

export default Home