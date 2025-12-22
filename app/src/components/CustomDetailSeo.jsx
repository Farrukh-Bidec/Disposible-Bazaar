"use client";
import Head from 'next/head';
import { Assets_Url } from '../const';

const CustomDetailSeo = ({ title, des, focuskey, canonicalUrl, schema, og_title, og_des, og_img }) => {

    // Utility to strip HTML tags from title if necessary
    // const stripHtml = (html) => {
    //     const doc = new DOMParser().parseFromString(html, 'text/html');
    //     return doc.body.textContent || "";
    // };
    const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
};

    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    // console.log(schema);

    return (
        <Head>
            {/* Title */}
            <title>{stripHtml(title) || 'Default Title'}</title>

            {/* Meta Description */}
            <meta name="description" content={des || 'Default description'} />

            {/* Focus Keyword */}
            {focuskey && <meta name="keywords" content={focuskey} />}

            {/* Canonical URL */}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Robots.txt rules */}
            {/* {seoData.robots_txt && <meta name="robots" content={seoData.robots_txt} />} */}

            {/* Schema markup */}
            {schema && (
                <script type="application/ld+json"   >
                    {schema}
                </script>
            )}

            {/* OG Description */}
            <meta property="og:type" content="website" />
                <meta property="og:title" content={og_title} />
                    <meta property="og:url" content={currentUrl} />
                        <meta property="og:image" content={`${Assets_Url}/${og_img}`} />
                            <meta property="og:description" content={og_des} />

                                {/* Sitemap URL */}
                                {/* {seoData.sitemap_xml && <link rel="sitemap" type="application/xml" href={seoData.sitemap_xml} />} */}

                                {/* Optional Google Analytics */}
                                <script async src="https://www.google-analytics.com/analytics.js"></script>
                            </Head>
                            )
}

                            export default CustomDetailSeo