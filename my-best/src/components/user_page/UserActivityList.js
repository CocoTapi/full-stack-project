import Accordion from '../UI/Accordion';
import classes from '../css/user_page/UserActivityList.module.css';
import { GoHeartFill } from 'react-icons/go';
import { Link } from 'react-router-dom';
import Tag from '../UI/Tag';
import ButtonS from '../UI/ButtonS';

function UserActivityList({ activity, onClick, icon, buttonWord }){

    const handleClick = (id, title) => {
        onClick(id, title)
    }


    const image = (
        <img src={`/images/accordionSmall/${activity.user_id}.png`} alt="example" style={{ borderRadius: '10px' }}/>
    )

    const headerContents = (
        <>
            <div className={classes.detailIcons}>
                <GoHeartFill />
                {/* {activity.is_saved ? <GoBookmarkFill /> : <GoBookmark /> } */}
            </div>
            <div className={classes.detailItem}>
                <p>{activity.like_count} likes</p>
            </div>
            <div className={classes.detailItem}>
                <p>{activity.summary}</p>
            </div>
            <div className={classes.durationGroup}>
                <p className={classes.labelTitle}>Duration:</p>
                <p>{activity.duration} mins</p>
            </div>

        </>
    )

    const activityDetail = (
        <div className={classes.accordionDetail}>
            <div className={classes.leftDetailItems}>
                <div className={classes.accordionAgeGroup}>
                    <p className={classes.labelTitle}>Age group :</p>
                    <p>{activity.age_group}</p>
                </div>
                <div className={classes.detailItem}>
                    <p className={classes.labelTitle}>Materials :</p>
                    <p>{activity.materials}</p>
                </div>
            </div>
            <div className={classes.rightDetailItems}>
                <div className={classes.detailItem}>
                    <p className={classes.labelTitle}>Objectives:</p>
                    <p>{activity.objectives}</p>
                </div>
                <div className={classes.detailItem}>
                    <p className={classes.labelTitle}>Instructions :</p>
                    <p>{activity.instructions}</p>
                </div>
                <div className={classes.detailItem}>
                    <p className={classes.labelTitle}>References :</p>
                    <p className={classes.accordionReference}>
                        {activity.links ? 
                            <Link to={activity.links}>
                                {activity.links}
                            </Link> 
                        : <p>none</p>
                        }
                    </p>
                </div>
                {activity.tags.map((tag) => (
                    <Tag key={tag} tagSize="small" >{tag}</Tag>
                ))}
            </div>
        </div>
    )

   
    const buttonChildren = (buttonWord ? (
        <ButtonS onClick={() => handleClick(activity.activity_id, activity.title)} >
            <p className={classes.buttonIcon}>{icon}</p>
            <p>{buttonWord}</p>
        </ButtonS>
    ) : ''
 )
    
    
    return ( 
        <div className={classes.accordionComponent}>
            <Accordion 
                    headerTitle={activity.title}
                    topImage={image}
                    headerContents={headerContents} 
                    activityDetail={activityDetail}
                    buttonChildren={buttonChildren}
                    color='white'
            />
        </div>
    )
};

export default UserActivityList;