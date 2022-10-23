import React, { useState, useEffect } from 'react';
import BlockContent from "@sanity/block-content-to-react"
import profileImage from '../profile_pic2.jpg';

function Bio() {

    const [bio, setBio] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTechStack = async () => {
        const sanityClient = require('@sanity/client')
        const client = sanityClient({
            projectId: 'gcy3wfy4',
            dataset: 'production',
            apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
            token: 'skq9VigjQEPrxMpHchBU7KCGoaWa9Iop84KjAOZaeEtZHppD3pMgJYqRkXxwMCu3G46Ds0yzHEwmtNnjgmRM7jS2J85H9k8I6oSAPOfJqIhOw5dqrMXhJqs24sEZAWOeXaYcLuZAKQoQZ9IIPnaqaeUtG40xv8gm0hqeN75QgxQgk7frKYtW', // or leave blank for unauthenticated usage
            useCdn: false, // `false` if you want to ensure fresh data
        })

        // const query = '*[_type == "bio" && published == true]{"cvfileURL": cvfile.asset->url}'
        const query = '*[_type == "bio"]{name,content,"cvfileURL": cvfile.asset->url}'

        try {
            await client.fetch(query)
                .then((projects) => {
                    setBio(projects)
                    setIsLoading(false)
                    console.log(bio)
                })
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchTechStack()
    }, []);

    if (isLoading) return <div>Loading...</div>

    return (
        <>

            <section id="wrapper--hero" className="section--page">
                <img id="profile-pic" src={profileImage} alt="Afaz's profile" />
                <div>
                    <h1 id="user-name">{bio[0].name}</h1>
                    <BlockContent
                        blocks={bio[0].content}
                        projectId="gcy3wfy4"
                        dataset="production"
                    />
                </div>
            </section>

            <section className="section--page">
                <div id="socials--list">
                    <a href="https://github.com/afazahamed" rel="noreferrer" target="_blank">Github</a>
                    <a href="https://www.linkedin.com/in/afaz-ahamed/" rel="noreferrer" target="_blank">Linkedin</a>
                    <a href="https://medium.com/@mrafazahd" rel="noreferrer" target="_blank">Medium</a>
                    <a href={bio[0].cvfileURL} rel="noreferrer" target="_blank">Download Resume</a>
                </div>
            </section>


            {/* <div>
                <h1 id="user-name">{bio[0].name}</h1>
                <BlockContent
                    blocks={bio[0].content}
                    projectId="gcy3wfy4"
                    dataset="production"
                />
            </div> */}
        </>
    )
}

export default Bio;