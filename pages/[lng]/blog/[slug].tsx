/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import {
  BlogSingle,
  BlogCategories,
  useI18n,
  BlogRecent
} from '@sirclo/nexus'

/* library template */
import { useBrand } from 'lib/utils/useBrand'

/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
const Placeholder = dynamic(() => import('components/Placeholder'))

const classesBlogSingle = {
  blogContainerClassName: "blog-detail",
  headerClassName: "blog-detail__header",
  headerContentClassName: "blog-detail__header-content",
  headerDetailClassName: "blog-detail__header--content-details",
  headerEndClassName: "d-none",
  authorPicContainerClassName: "d-none",
  authorPicClassName: "d-none",
  authorInfoClassName: "d-none",
  createdByInnerClassName: "blog-detail__meta d-flex flex-row align-items-center justify-content-start flex-wrap",
  authorClassName: "d-flex flex-row align-items-center justify-content-start order-2",
  dateClassName: "d-flex flex-row align-items-center justify-content-start order-1",
  blogContentClassName: "blog-detail__content",

  shareMediaClassName: "blog-detail__header--content-details-share",
  shareTextClassName: "blog-detail__header--content-details-share-text",
  socialMediaContainerClassName: "blog-detail__header--content-details-share-sosmed",
  socialMediaClassName: "blog-detail__header--content-details-share-sosmed-items"
}

const classesBlogCategories = {
  containerClassName: "blogs-category",
  categoryClassName: "blogs-category__items",
  linkClassName: "blogs-category__items--link",
}

const classesPlaceholderBlogs = {
  placeholderImage: "placeholder-item placeholder-item--text"
}

const classesBlogRecent = {
  containerClassName: "recent-post",
  blogRecentClassName: "recent-post__items row",
  imageClassName: "recent-post__items--image  col-12 col-md-12",
  labelContainerClassName: "recent-post__items--label col-12 col-md-12 blog-padding",
  titleClassName: "recent-post__items--label-title",
  dateClassName: "recent-post__items--label-date",
}


const BlogSlug: FC<any> = ({
  lng,
  lngDict,
  slug,
  brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n();
  const [title, setTitle] = useState<string>("")

  const linksBreadcrumb = [`${i18n.t("home.title")}`, `${i18n.t("blog.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
    >
      <div className="top-head">
        <h3 className="text-capitalize">
          {title}
        </h3>
      </div>
      <Breadcrumb
          links={linksBreadcrumb}
          lng={lng}
        />
      <section className="mt-0">
        <div className="custom-container">
          <div className="row">
            <div className="col-12 col-lg-3 border-blog display-web">
              <div className="row card-recent">
                <div className="col-12 col-md-6 col-lg-12 blog-padding">
                  <h2 className="title-side-blogs">{i18n.t("blog.categories")}</h2>
                  <BlogCategories
                    classes={classesBlogCategories}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-12 blog-padding">
                  <h2 className="title-side-blogs">{i18n.t("blog.recentPost")}</h2>
                  <BlogRecent
                    classes={classesBlogRecent}
                    limit={5}
                    linkPrefix="blog"
                    thumborSetting={{
                      width: 100,
                      format: "webp",
                      quality: 85
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-9">
              <BlogSingle
                classes={classesBlogSingle}
                ID={slug.toString()}
                getTitle={setTitle}
                timeIcon={
                  <div className="blog-detail__icon blog-detail__icon--time"></div>
                }
                authorIcon={
                  <div className="blog-detail__icon blog-detail__icon--author"></div>
                }
                loadingComponent={
                  <div className="row">
                    <div className="col-2">
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                    </div>
                    <div className="col-3">
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                    </div>
                    <div className="col-12 py-4">
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                      <Placeholder classes={classesPlaceholderBlogs} withImage />
                    </div>
                  </div>
                }
              />
            </div>
            <div className="col-12 col-lg-3 border-blog display-app">
              <div className="row card-recent">
                <div className="col-12 col-md-6 col-lg-12 blog-padding">
                  <h2 className="title-side-blogs">{i18n.t("blog.categories")}</h2>
                  <BlogCategories
                    classes={classesBlogCategories}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-12 blog-padding">
                  <h2 className="title-side-blogs">{i18n.t("blog.recentPost")}</h2>
                  <BlogRecent
                    classes={classesBlogRecent}
                    limit={5}
                    linkPrefix="blog"
                    thumborSetting={{
                      width: 100,
                      format: "webp",
                      quality: 85
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { default: lngDict = {} } = await import(
    `locales/${params.lng}.json`
  );

  const brand = await useBrand(req);

  return {
    props: {
      lng: params.lng,
      lngDict,
      slug: params.slug,
      brand: brand || ''
    },
  };
}

export default BlogSlug;
