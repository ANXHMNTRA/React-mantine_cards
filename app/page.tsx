"use client"

import { useEffect, useState } from 'react';
import { Grid, Card, CardProps, Text, Button, Anchor, Center, Image, Flex } from '@mantine/core';
import { IconAt, IconWorldWww, IconPhone, IconStar, IconTrash, IconUserPlus } from '@tabler/icons-react';
import Link from 'next/link';

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
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);


  const UserCard: React.FC<UserCardProps> = ({ user, className, ...props }) => {
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
      <Card {...props} >
        <Center>
          <Image
            radius={"50%"}
            h={100}
            w={100}
            fit="contain"
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt={user.name}
          />
        </Center>
        <Center><h2> {user.name}
          {isFollowed && <IconStar />}
        </h2></Center>
        <Anchor c="gray" component={Link} href={`mailto:${user.email}`}>
          <IconAt stroke={1.5} />
          {user.email}
        </Anchor>
        <Anchor c="gray" component={Link} href={`tel:${user.phone}`}>
          <IconPhone stroke={1.5} size={"1.5rem"} />
          {user.phone}
        </Anchor>
        <Anchor c="gray" component={Link} href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
          <IconWorldWww stroke={1.5} size={"1.5rem"} />
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
          <Button fullWidth variant='outline'><IconTrash width={16} height={16} /> delete</Button>
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

  return (
    <div>
      <Grid
        // grow
        // gutter="xl"
        style={{
          margin: 10
        }}>
        {users.map(user => (
          <Grid.Col span={3} key={user.id}>
            <UserCard
              key={user.id}
              user={user}
              // shadow="md"
              // padding="md"
              radius="md"
              style={{
                minWidth: 200,
                borderColor: "#dee2e6",
                margin: "auto",
                // width: 'calc(110% / 4)', // Initially show 4 cards in a row
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
