import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type PostImageCoverProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};

export function PostImageCover({ imageProps, linkProps }: PostImageCoverProps) {
  return (
    <Link
      className={clsx(
        'h-full w-full',
        'rounded-xl',
        'overflow-hidden',
        linkProps.className,
      )}
      {...linkProps}
    >
      <Image
        className={clsx(
          'object-center object-cover',
          'group-hover:scale-105 transition',
          'h-full w-full',
          imageProps.className
        )}
        {...imageProps}
        alt={imageProps.alt}
      />
    </Link>
  );
}
