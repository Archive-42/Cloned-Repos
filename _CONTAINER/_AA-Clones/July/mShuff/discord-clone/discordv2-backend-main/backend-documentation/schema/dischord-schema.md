# Dischord Data Schema

## Users

| attribute name | data type   | details               |
| -------------- | ----------- | --------------------- |
| id             | integer     | primary key, not null |
| username       | varchar(25) | not null, unique      |
| email          | varchar(40) | not null, unique      |
| hashedPassword | varchar     | not null, (binary)    |
| avatarUrl      | varchar     |                       |

## Servers

| attribute name | data type    | details               |
| -------------- | ------------ | --------------------- |
| id             | integer      | primary key, not null |
| title          | varchar(100) | not null              |

## ServerMembers

| attribute name | data type | details               |
| -------------- | --------- | --------------------- |
| id             | integer   | primary key, not null |
| serverId       | integer   | foreign key, not null |
| userId         | integer   | foreign key, not null |

## ServerModerators

| attribute name | data type | details               |
| -------------- | --------- | --------------------- |
| id             | integer   | primary key, not null |
| serverId       | integer   | foreign key, not null |
| userId         | integer   | foreign key, not null |

## Channels

| attribute name | data type     | details               |
| -------------- | ------------- | --------------------- |
| id             | integer       | primary key, not null |
| title          | varchar(100)  | not null              |
| topic          | varchar(1024) |                       |
| serverId       | integer       | foreign key, not null |

## ChannelMessages

| attribute name | data type     | details               |
| -------------- | ------------- | --------------------- |
| id             | integer       | primary key, not null |
| channelId      | integer       | foreign key, not null |
| userId         | integer       | foreign key, not null |
| body           | varchar(2000) | not null              |
| createdAt      | timestamp     | not null              |
