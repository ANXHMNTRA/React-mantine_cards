"use client"

import { useEffect, useState } from 'react';
import { Grid, Card, CardProps, Text, Button, Anchor, Center, Image, Flex } from '@mantine/core';
import { IconAt, IconWorldWww, IconPhone, IconStar, IconTrash, IconUserPlus } from '@tabler/icons-react';
import Link from 'next/link';
import "./demo.css"

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface UserCardProps extends CardProps {
  user: User;
  className?: string;
  handleDelete: (id: number) => void;
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);


  const UserCard: React.FC<UserCardProps> = ({ user, className, handleDelete, ...props }) => {
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollowToggle = () => {
      setIsFollowed(!isFollowed);
    };
    const handleEmailClick = () => {
      window.location.href = `mailto:${user.email}`;
    };

    const handlePhoneClick = () => {
      window.location.href = `tel:${user.phone}`;
    };

    const handleWebsiteClick = () => {
      window.open(`https://${user.website}`, '_blank');
    };
    return (
      <Card {...props} className='card' >
        <Center>
          <Anchor c="gray" className='AnchorStyle' component={Link} href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
            <Image
              radius={"50%"}
              h={130}
              w={130}
              fit="contain"
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt={user.name}
            /> </Anchor>
        </Center>
        <Center><h4> {user.name}
          {isFollowed && <IconStar width={16} height={16} />}
        </h4></Center>
        <Anchor c="gray" component={Link} href={`mailto:${user.email}`}
          className='AnchorStyle'
        >
          <IconAt stroke={1.5} size={15} className='iconLogo' />
          {user.email}
        </Anchor>
        <Anchor c="gray" className='AnchorStyle' component={Link} href={`tel:${user.phone}`}>
          <IconPhone stroke={1.5} size={15} className='iconLogo' />
          {user.phone}
        </Anchor>
        <Anchor c="gray" className='AnchorStyle' component={Link} href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
          <IconWorldWww stroke={1.5} size={15} className='iconLogo' />
          {user.website}
        </Anchor>

        <br />

        <Flex
          // mih={50}
          // maw={}
          gap="md"
          justify="center"
          align="center"
        // direction="row"
        >

          <Button fullWidth onClick={handleFollowToggle} >
            <IconUserPlus width={16} height={16} />
            {isFollowed ? 'Unfollow' : 'Follow'}
          </Button>
          <Button fullWidth variant='outline' onClick={() => handleDelete(user.id)}>

            <IconTrash width={16} height={16} /> Delete</Button>
        </Flex>
      </Card>
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        const data = await response.json();
        const updateData = data.map((obj: any) => { return { ...obj, isFollowed: false } })
        setUsers(data.slice(0, 10)); // Get first 10 users
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id: any) => {
    const updatedData = users.filter((item) => item.id !== id);
    setUsers(updatedData);
  };

  return (
    <div>
      <Grid
        // grow
        // gutter="xl"
        style={{
          margin: 10
        }}>
        {users.map(user => (
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={user.id} >
            <UserCard
              handleDelete={handleDelete}
              key={user.id}
              user={user}
              shadow="md"
              // padding="md"
              radius="md"
              style={{
                minWidth: 200,
                // width: 'calc(100% / 4)', // Initially show 4 cards in a row
                // '@media (max-width: 1200px)': {
                //   width: 'calc(100% / 2)' // Show 2 cards in a row on screens up to 1200px
                // },
                // '@media (max-width: 767px)': {
                //   width: '100' // Show 1 card per row on screens up to 767px
                // }
              }}
            />
          </Grid.Col>

        ))}
      </Grid>
    </div>
  );
}
