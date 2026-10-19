import axios from 'axios';
import React, { Fragment, useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import UserTile from './UserTile'

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);

    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + 'user/connections', { withCredentials: true });
            dispatch(addConnections(res.data?.data || []));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getConnections();
    }, [])

    if (!connections || connections.length === 0) return (
        <div className="page-content flex flex-col items-center justify-center gap-4 px-4 text-center pb-16">
            <div className="text-7xl mb-2">🔗</div>
            <h2 className="text-2xl font-extrabold gradient-text">No Connections Yet</h2>
            <p className="text-base-content/50 text-sm max-w-xs">
                Start exploring developers in your feed and send interest requests!
            </p>
        </div>
    )

    return (
        <Fragment>
            <div className="page-content px-4 py-8 pb-20">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold gradient-text">My Connections</h1>
                    <p className="text-base-content/50 text-sm mt-1">
                        {connections.length} {connections.length === 1 ? 'connection' : 'connections'} found
                    </p>
                    <div className="mx-auto mt-3 h-1 w-16 rounded-full"
                        style={{ background: 'linear-gradient(90deg, oklch(var(--p)), oklch(var(--s)))' }} />
                </div>

                {/* Responsive grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {connections.map((data) => (
                        <UserTile user={data} key={data._id} />
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default Connections