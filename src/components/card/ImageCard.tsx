import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styled from '@mui/material/styles/styled';
import CoverImage from '@/app/cover-image';

export default function ImageCard({ ...props }) {
  const itemData = props.itemData;

  return (
    <ImageList cols={4}>
      {itemData.map((item: any) => (
        <ImageListItem
          key={item.img}
          sx={{ width: '100%', '&:hover': { opacity: 0.8 } }}
        >
          <CoverImage title={item.title} slug="" url={item.img} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
