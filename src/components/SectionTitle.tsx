import { Typography, Box } from '@mui/material';
import Image from 'next/image';

interface SectionTitleProps {
    title: string;
    image: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, image }) => {
    return (
        <Box position="relative" textAlign="center">
            <Image
                src={image}
                alt={title}
                layout="responsive"
                width={1200}
                height={400}
                style={{ filter: 'brightness(0.5)' }}
            />
            <Typography
                variant="h1"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, // Responsive font size
                    fontWeight: 'bold',
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};

export default SectionTitle;
