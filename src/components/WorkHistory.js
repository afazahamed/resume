import React, { useState, useEffect } from 'react';
import BlockContent from "@sanity/block-content-to-react"

function WorkHistory() {

    const [workHistory, setWorkHistory] = useState([]);
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

        const query = '*[_type == "workhistory" && published == true]'

        try {
            await client.fetch(query)
                .then((projects) => {
                    setWorkHistory(projects)
                    setIsLoading(false)
                    console.log(workHistory)
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
            <div className="line-break"></div>
            {workHistory.map(projects => (
                <>
                    <div className="card--work-history">
                        <strong>{projects.name}</strong>
                        <BlockContent
                            blocks={projects.content}
                            projectId="gcy3wfy4"
                            dataset="production"
                        />
                    </div>
                    <div className="line-break"></div>
                </>
            ))}
        </>
    )
}

export default WorkHistory;