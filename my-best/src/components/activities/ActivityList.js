import { Link } from 'react-router-dom';

function ActivityList({ activities }){
    return (
        <div>
            <h1>All Activities</h1>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.activity_id}>
                        <Link to={`/activities/${activity.activity_id}`}>
                            <div>
                                <h2>{activity.title}</h2>
                                <div>{activity.duration}</div>
                                <div>{activity.ageGroup}</div>
                                <div>{activity.sumary}</div>
                                {activity.tags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default ActivityList;