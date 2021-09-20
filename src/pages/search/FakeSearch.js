
import './search.css'
export default function FakeSearch({ lodingFake }) {

    return (
        <div >
            {
                lodingFake ?
                    <>
                        <div className="fake_style">
                        
                        </div>
                        <div className="fake_style"></div>
                        <div className="fake_style"></div>
                        <div className="fake_style"></div>
                    </> : null
            }

        </div>
    )

}