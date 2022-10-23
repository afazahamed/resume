import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import BlockContent from "@sanity/block-content-to-react"

function Single() {

    const params = useParams();

    const [projectsList, setProjectsList] = useState(null);

    const fetchProjects = async () => {
        const sanityClient = require('@sanity/client')
        const client = sanityClient({
            projectId: 'gcy3wfy4',
            dataset: 'production',
            apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
            token: 'skq9VigjQEPrxMpHchBU7KCGoaWa9Iop84KjAOZaeEtZHppD3pMgJYqRkXxwMCu3G46Ds0yzHEwmtNnjgmRM7jS2J85H9k8I6oSAPOfJqIhOw5dqrMXhJqs24sEZAWOeXaYcLuZAKQoQZ9IIPnaqaeUtG40xv8gm0hqeN75QgxQgk7frKYtW', // or leave blank for unauthenticated usage
            useCdn: true, // `false` if you want to ensure fresh data
        })

        const query = `*[slug.current == "${params.slug}"]`

        try {
            await client.fetch(query)
                .then((projects) => {
                    setProjectsList(projects[0])
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

    if (!projectsList) return <div id="container--main"> <p>Loading...</p> </div>

    document.title = projectsList.name + " (Projects) - Afaz's portfolio";

    return (

        <div id="container--main">
            <Link to="/">&#x2190; Go Back</Link>

            <h1>{projectsList.name}</h1>
            <small>{projectsList._createdAt}</small>

            <BlockContent
                blocks={projectsList.content}
                projectId="gcy3wfy4"
                dataset="production"
            />

        </div>
    )

}

export default Single;