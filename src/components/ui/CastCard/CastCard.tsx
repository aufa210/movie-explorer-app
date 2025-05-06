import React from 'react';
import CaptainAmerica from '@/assets/AnthonyMackie.png';
import styles from './CastCard.module.scss';

type CastCardProps = {
  name: string;
  character: string;
};

const CastCard: React.FC<CastCardProps> = ({
  name = 'Anthony Mackie',
  character = 'Sam Wilson / Captain America',
}: CastCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={CaptainAmerica}
          alt='Captain America'
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <h4>{name}</h4>
        <p>{character}</p>
      </div>
    </div>
  );
};

export default CastCard;

// Fetch Version
// ('use client');

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import styles from './CastCardMobile.module.scss';

// type Cast = {
//   id: number;
//   name: string;
//   character: string;
//   profile_path: string;
// };

// export const DynamicCastList = () => {
//   const [castList, setCastList] = useState<Cast[]>([]);

//   useEffect(() => {
//     const fetchCast = async () => {
//       try {
//         const res = await fetch('/api/cast'); // Ganti endpoint jika perlu
//         const data = await res.json();
//         setCastList(data.cast);
//       } catch (error) {
//         console.error('Gagal mengambil data cast:', error);
//       }
//     };

//     fetchCast();
//   }, []);

//   return (
//     <div className={styles.castList}>
//       {castList.map((cast) => (
//         <div key={cast.id} className={styles.card}>
//           <div className={styles.imageWrapper}>
//             <Image
//               src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
//               alt={cast.name}
//               width={60}
//               height={80}
//               className={styles.image}
//             />
//           </div>
//           <div className={styles.info}>
//             <h4>{cast.name}</h4>
//             <p>{cast.character}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
