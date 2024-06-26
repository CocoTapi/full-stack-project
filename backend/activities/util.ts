import Database from "../database/Database";

const db = Database.db;

export async function getTagId(tag: string) {
    const getTagIdQuery = `
        SELECT tag_id 
        FROM tags
        WHERE tag_title = $1
    `

    const result = await db.query(getTagIdQuery, [tag]);
    console.log("result:", result.rows);

    if (result.rows.length === 0) {
       return 0;
    } 

    const id = result.rows[0].tag_id;
    return id;
}

export async function insertTags(tags: string[], activity_id: number, date: Date){
    for (let tag of tags) {
        const tag_id: number = await getTagId(tag) ;
            
        if(tag_id > 0) {
            const addTagQuery = `
                INSERT INTO activity_tags (
                    tag_id,
                    activity_id,
                    last_update
                ) 
                VALUES (
                    $1,
                    $2,
                    $3
                );
            `
            await db.query(addTagQuery, [tag_id, activity_id, date])
        } else if(tag_id === 0){
            const createTagIdQuery = `
                WITH inserted_tag AS (
                    INSERT INTO tags (
                        tag_title,
                        last_update
                    )
                    VALUES (
                        $1,
                        $2
                    )
                    RETURNING 
                        tag_id
                ) 
                INSERT INTO activity_tags (
                    tag_id,
                    activity_id,
                    last_update
                )
                VALUES (
                    (SELECT tag_id FROM inserted_tag),
                    $3,
                    $4
                );
            `
            await db.query(createTagIdQuery, [tag, date, activity_id, date]);
        }
    }
}

//Queries

export const getSummaryQuery: string = `
    SELECT 
        a.activity_id,
        a.user_id, 
        a.title, 
        a.summary, 
        d.duration_title, 
        age.age_group_title AS age_group,
        ARRAY_AGG(tag_title) AS tags
    FROM 
        activities AS a 
        JOIN activity_durations AS ad ON a.activity_id = ad.activity_id 
        JOIN durations As d ON d.duration_id = ad.duration_id 
        JOIN activity_tags As at ON a.activity_id = at.activity_id 
        JOIN tags AS t ON t.tag_id = at.tag_id 
        JOIN activity_age_groups AS aa ON a.activity_id = aa.activity_id
        JOIN age_groups AS age ON age.age_group_id = aa.age_group_id
    GROUP BY 
        a.activity_id,
        a.user_id, 
        a.title, 
        a.summary, 
        d.duration_title,
        age.age_group_title
    `;

export const getDetailQuery: string = `
    SELECT
        a.activity_id, 
        a.user_id, 
        a.title, 
        a.summary, 
        d.duration_title AS duration, 
        age.age_group_title AS age_group,
        a.objectives,
        a.materials,
        a.instructions,
        a.links,
        ARRAY_AGG(tag_title) AS tags
    FROM 
        activities AS a 
        JOIN activity_durations AS ad ON a.activity_id = ad.activity_id 
        JOIN durations As d ON d.duration_id = ad.duration_id 
        JOIN activity_tags As at ON a.activity_id = at.activity_id 
        JOIN tags AS t ON t.tag_id = at.tag_id 
        JOIN activity_age_groups AS aa ON a.activity_id = aa.activity_id
        JOIN age_groups AS age ON age.age_group_id = aa.age_group_id
    WHERE 
        a.activity_id = $1
    GROUP BY 
        a.activity_id,
        a.user_id, 
        a.title, 
        a.summary, 
        d.duration_title,
        age.age_group_title,
        a.objectives,
        a.materials,
        a.instructions,
        a.links
    `;

export const addActivitiesQuery: string = `
    INSERT INTO activities (
        user_id, 
        title, 
        summary, 
        objectives, 
        materials, 
        instructions, 
        links, 
        create_date, 
        last_update
    ) 
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING
        activity_id
    `


export function getInsertQueryForNestedTable(subject: string){
    const query =  `
    INSERT INTO activity_${subject}s (
        activity_id, 
        ${subject}_id,
        last_update
    ) 
    VALUES (
        $1, 
        (SELECT ${subject}_id FROM ${subject}s WHERE ${subject}_title = $2),
        $3
    );`

   return query
}

export function getUpdateQueryForNestedTable(subject: string) {
        const updateQuery = `
        UPDATE 
            activity_${subject}s
        SET 
            ${subject}_id = (SELECT ${subject}_id FROM ${subject}s WHERE ${subject}_title = $1),
            last_update = $2
        WHERE activity_id = $3
    `;
    return updateQuery;
}

export function getDeleteAllColumnQuery(table: string){
    const deleteQuery = `
        DELETE FROM 
           ${table}
        WHERE 
            activity_id = $1
    `
    return deleteQuery;
}

export const deleteUserFavQuery: string = `
        DELETE FROM 
            user_favorites
        WHERE
            activity_id = $1 
    `



