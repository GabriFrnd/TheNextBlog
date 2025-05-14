import { PostImageCover } from '../PostImageCover';
import { PostSummary } from '../PostSummary';
import clsx from 'clsx';

export function FeaturedPost() {
  const slug = 'qualquer coisa';
  const postLink = `/post/${slug}`;

  return (
    <section
      className={clsx(
        'gap-8 mb-16',
        'grid grid-cols-1',
        'group',
        'sm:grid-cols-2',
      )}
    >
      <PostImageCover
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          src: '/images/bryen_9.png',
          height: 720,
          width: 1200,
          priority: true,
          alt: 'Imagem do post',
        }}
      />

      <PostSummary
        createdAt={'2025-04-08T00:24:38.616Z'}
        postLink={postLink}
        postHeading='h1'
        title={'Olha a rotina matinal de pessoas altamente eficazes'}
        excerpt={'O Next.js também é uma boa escolha para quem quer se preocupar com performance e SEO.'}
      />
    </section>
  );
}
