import clientPromise from "../../lib/mongodb";
import {NextApiRequest, NextApiResponse} from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const client = await clientPromise;
        const db = client.db('shimunia');

        const posts = await db.collection("posts")
            .find({})
            .toArray();
        res.json(posts);
    } catch (err) {
        console.error(err);
    }
}
