import { GridTileImage } from 'components/grid/tile';
import { getCollectionProducts, getCollections } from 'lib/shopify';
import type { Collection } from 'lib/shopify/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  // item: Product;
  item: Collection;

  size: 'full' | 'half';
  priority?: boolean;
}) {
  console.log("collection data",item)

const path=item.path.split('/search')
const splitPath=path[1];

  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/search/${splitPath}`}>
        <GridTileImage
        // collection images
          src={item.image.originalSrc}
          // src={"/flow.png"}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title as string,
            amount: "0",
            currencyCode: "0"
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Show collections query instead of products
  // Collections that start with `hidden-*` are hidden from the search page.
  const collections = await getCollections();
  const homepageItems = await getCollectionProducts({
    collection: 'hidden-homepage-featured-items'
  });

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;
  if (!collections[0] || !collections[1] || !collections[2]) return null;

  // const [firstProduct, secondProduct, thirdProduct] = homepageItems;
  const [firstProduct, secondProduct, thirdProduct] = collections;

  // console.log("menu data",collections)

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
