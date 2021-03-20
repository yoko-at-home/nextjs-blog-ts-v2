import Layout from "../../components/layout";
import {
  apiUrl,
  blogGetPk,
  getAllPostIds,
  getPostData,
} from "../../lib/blogApi";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import { READ_BLOG } from "../../lib/type";
import useSWR from "swr";
import { useEffect } from "react";
import { useRouter } from "next/router";

type Props = {
  postData: READ_BLOG | null;
};
type PathProps = { id: string };

export const getStaticProps: GetStaticProps<Props, PathProps> = async ({
  params,
}) => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths<PathProps> = async () => {
  const id = await getAllPostIds();
  return {
    paths: id,
    fallback: false,
  };
};

const Post: React.FC<Props> = ({ postData }) => {
  const router = useRouter();
  const { data: blog, mutate } = useSWR(
    `${apiUrl}${postData?.id}/`,
    blogGetPk,
    {
      initialData: postData,
    }
  );
  useEffect(() => {
    mutate();
  }, []);

  if (router.isFallback || !blog) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{blog.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={blog.created_at} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </Layout>
  );
};
export default Post;
