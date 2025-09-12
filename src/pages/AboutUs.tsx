import "./AboutUs.css";
import Overview from "../components/Overview";
const AboutUs = () => {
    return (
        <>
            <main className="aboutUs">
                <h1>Euphoria GenX Group: Mern 63</h1>
                <div className="profile-container">
                    <div className="profile">
                        <img src="assets\shoya.jpg" alt="pfp" />
                        <p>Sandipan Banik</p>
                        <p>Programmer</p>
                        <h3>Techno India Institute of Technology</h3>
                    </div>

                    <div className="profile">
                        <img src="assets\Profile.png" alt="pfp" />
                        <p>Suparno Mandal</p>
                        <p>Programmer, Designer</p>
                        <h3>Techno India Institute of Technology</h3>
                    </div>
                </div>
            </main>
            <Overview pageName="About Us"
                summaries={[
                    { Name: "Github (ImSandyyyy)", Link: "https://github.com/ImSandyyyy", IsAnId: false },
                    { Name: "Github (D3FAU4T)", Link: "https://github.com/D3FAU4T", IsAnId: false },
                ]}
            />
        </>
    )
}

export default AboutUs;