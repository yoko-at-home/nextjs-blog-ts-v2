import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/blogApi";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import { POST } from "../../lib/type";

interface Props {
  postData: POST | null;
}
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

const Post: React.FC<Props> = ({ postData }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  );
};
export default Post;
