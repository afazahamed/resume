import profileImage from '../profile_pic2.jpg';
import ProjectListCard from '../components/ProjectListCard';
import TechStackListCard from '../components/TechStackCard';
import SkillsAndQualification from '../components/SkillsAndQualification';
import WorkHistory from '../components/WorkHistory';
import Bio from '../components/Bio';
import React, { useState, useEffect } from 'react';

function Home() {

    const [projectsList, setProjectsList] = useState([]);

    document.title = "Afaz's portfolio";

    const fetchProjects = async () => {
        const sanityClient = require('@sanity/client')
        const client = sanityClient({
            projectId: 'gcy3wfy4',
            dataset: 'production',
            apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
            token: 'skq9VigjQEPrxMpHchBU7KCGoaWa9Iop84KjAOZaeEtZHppD3pMgJYqRkXxwMCu3G46Ds0yzHEwmtNnjgmRM7jS2J85H9k8I6oSAPOfJqIhOw5dqrMXhJqs24sEZAWOeXaYcLuZAKQoQZ9IIPnaqaeUtG40xv8gm0hqeN75QgxQgk7frKYtW', // or leave blank for unauthenticated usage
            useCdn: false, // `false` if you want to ensure fresh data
        })

        const query = '*[_type == "projects"]{_id,name,slug}'

        try {
            await client.fetch(query)
                .then((projects) => {
                    setProjectsList(projects)
                    console.log(projectsList)
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, []);

    return (

        <div id="container--main">

            <Bio />

            <section className="section--page">
                <h2>Skills & Qualifications</h2>
                <SkillsAndQualification />
            </section>

            <section className="section--page">
                <h2>Tech stack</h2>

                <div id="wrapper--techstack__items">
                    <TechStackListCard />
                </div>
            </section>

            <section id="work-history-wrapper" className="section--page">
                <h2>Work History</h2>
                <WorkHistory />
            </section>

            <section className="section--page" id='accomplishments'>
                <h2>Projects & Accomplishments</h2>
                {projectsList.map(projects => (
                    <ProjectListCard key={projects._id} projects={projects} />
                ))}
            </section>
        </div>
    )

}

export default Home;