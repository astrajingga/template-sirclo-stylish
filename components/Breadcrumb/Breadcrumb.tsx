import { FC } from "react";
import Link from 'next/link';

export type PageHeadingPropsType = {
  title: string
  links: Array<string>
  withImage?: string
  lng: any
}

const breadcrumbTitleClasses = {
  padding: "3em 3em",
  backgroundColor: "#F1F2F7",
  width: "100%"
};

const Breadcrumb: FC<any> = ({
  title,
  links,
  withImage,
  lng
}) => {
  return (
    <div
      className={`section-breadcrumb ${withImage ? "section-breadcrumb__image" : ""}`}
      style={{ backgroundImage: `url(${withImage})` }}
    >
      <div style={breadcrumbTitleClasses}>
      <h1 className="section-breadcrumb__title">{title}</h1>
      </div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb breadcrumb-merlin">
          {
            links.map((el, idx) => {
              if (el === "Home" || el === "Beranda") {
                return (
                  <li className="breadcrumb-item breadcrumb-merlin-item" key={idx}>
                    <Link href="/[lng]" as={`/${lng}`}>
                      <a className="breadcrumb-merlin-item__link">{el}</a>
                    </Link>
                  </li>
                )
              }

              if (idx === (links.length - 1)) {
                return (
                  <li className="breadcrumb-item breadcrumb-merlin-item" key={idx}>
                    <a className="breadcrumb-merlin-item__link font-weight-bold">{el}</a>
                  </li>
                )
              }
              else {
                return (
                  <li className="breadcrumb-item breadcrumb-merlin-item" key={idx}>
                    <a className="breadcrumb-merlin-item__link">{el}</a>
                  </li>
                )
              }
            })
          }
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumb;