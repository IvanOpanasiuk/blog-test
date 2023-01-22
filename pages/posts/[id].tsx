import {GetStaticPaths, GetServerSideProps} from 'next';
import Head from 'next/head';

import Layout from '../../components/layout';
import Date from '../../components/date';

import utilStyles from '../../styles/utils.module.css';
type Props = {
    post: {
        _id: string;
        title: string;
        date: string;
        text: string
    },
};

export default function Post({ post } : Props ) {
    return (
        <Layout>
            <Head>
                <title>{post.title}</title>
            </Head>

            <article>
                <h1 className={utilStyles.headingXl}>{post.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={post.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.text }} />
            </article>
        </Layout>
    )
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    try{
        const res = await fetch(`${process.env.API_ROUTES_URL}/api/posts`);
        const data = await res.json();
        const post = data.find(post => post._id === params.id);

        return {
            props: {
                post,
            },
        };
    } catch (err) {
        console.log(err.message);
    }
};
