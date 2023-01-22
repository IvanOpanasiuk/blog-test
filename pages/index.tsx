import { GetServerSideProps} from 'next';
import Link from 'next/link';
import Head from 'next/head';

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import clientPromise from '../lib/mongodb';
import Date from '../components/date';

type Post = {
    date: string;
    title: string;
    _id: string;
    text: string;
}
type Props = {
    data: Post[];
    isConnected: boolean;
}

export default ({ data, isConnected }: Props) => {
    if(!isConnected) {
        return (
            <Layout home>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <div>Something went wrong</div>
            </Layout>

        )
    }
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>I'm Ivan. I'm javaScript developer. I like CSGO!</p>

            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Articles:</h2>
                <ul className={utilStyles.list}>
                    {data.map(({ _id, date, title }) => (
                        <li className={utilStyles.listItem} key={_id}>
                            <Link href={`/posts/${_id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try{
        await clientPromise;
        const res = await fetch(`${process.env.API_ROUTES_URL}/api/posts`);
        const data = await res.json();

        return {
            props: {
                isConnected: true,
                data
            },
        }
    } catch (err) {
        console.error(err);
        return {
            props: { isConnected: false },
        };
    }
};
