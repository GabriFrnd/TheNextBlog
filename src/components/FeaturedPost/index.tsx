import { PostImageCover } from '../PostImageCover';
import { PostHeading } from '../PostHeading';
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

      <div className={clsx('flex flex-col', 'gap-4', 'sm:justify-center')}>
        <time
          className={clsx('block', 'text-slate-600 text-sm/tight')}
          dateTime='2025-05-11'
        >
          11/05/2025 - 16:00
        </time>

        <PostHeading href={postLink} as='h2'>
          Um título qualquer
        </PostHeading>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur non
          dolor minus possimus recusandae neque perferendis tempore dolore a
          illo velit excepturi, id nostrum dolorum repudiandae quia laborum
          atque mollitia!
        </p>
      </div>
    </section>
  );
}
