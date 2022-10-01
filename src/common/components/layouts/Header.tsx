// TODO: 분할 필요 - 220927
import React, { useMemo, useState } from 'react';
import {
  CloseOutlined,
  DarkMode,
  LightMode,
  LocalOffer,
  Login,
  Logout,
  Notifications,
  Person,
  RssFeed,
  Search,
  Settings,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { UserEntity, UserRoleEnum } from '@core/entities/auth.entity';

const NAV_ITEM_LIST = [
  {
    label: 'Posts',
    href: '/posts',
  },
  {
    label: 'Resume',
    href: '/resume',
  },
  {
    label: 'About',
    href: '/about',
  },
];

interface HeaderProps {
  user: UserEntity;
  isLogged: boolean;
  onLogout: () => void;
  onThemeChange: () => void;
  themeMode: boolean;
}

export const Header = ({
  user,
  isLogged,
  themeMode,
  onThemeChange,
  onLogout,
}: HeaderProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuEl, setUserMenuEl] = useState<HTMLElement | null>(null);

  const isUserMenuOpen = useMemo(() => Boolean(userMenuEl), [userMenuEl]);

  const handleToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleUserMenuOpen: React.MouseEventHandler<HTMLElement> = (e) => {
    setUserMenuEl(e.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuEl(null);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    // TODO: 검색
    e.preventDefault();
  };

  return (
    <AppBar position="fixed" enableColorOnDark>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: 'xl',
          width: '100%',
          m: '0 auto',
          px: {
            md: '1em',
          },
        }}
      >
        {/* TODO: 로고 교체 */}
        <Typography variant="h5" noWrap component="div">
          <NextLink href="/">LOGO</NextLink>
        </Typography>

        <Box
          flex={1}
          display={{
            xs: 'none',
            md: 'flex',
          }}
          alignItems="center"
          justifyContent="center"
          gap="2em"
        >
          {NAV_ITEM_LIST.map((item) => (
            <NextLink key={item.href} href={item.href} passHref>
              <Link color="primary.contrastText" underline="hover">
                {item.label}
              </Link>
            </NextLink>
          ))}
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Box
            onSubmit={handleSubmit}
            component="form"
            display={{
              xs: 'none',
              sm: 'flex',
            }}
            alignItems="center"
            justifyContent="center"
            gap="5px"
          >
            <Search color="inherit" />
            <Input
              aria-label="search input"
              placeholder="Searching.."
              sx={{
                width: '200px',
                color: 'primary.contrastText',
                '&:not(.Mui-disabled):hover::before': {
                  borderColor: 'primary.contrastText',
                },
                ':before': { borderBottomColor: 'primary.contrastText' },
              }}
            />
          </Box>

          <Box>
            <IconButton
              onClick={onThemeChange}
              size="large"
              edge="start"
              color="inherit"
              aria-label="change theme color"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                ml: user.id ? '12px' : 0,
              }}
            >
              {themeMode ? <DarkMode /> : <LightMode />}
            </IconButton>

            {user.id && (
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
              >
                {/* TODO: 연동하면서, 토글 메뉴 추가 */}
                <Badge badgeContent={17} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            )}

            <IconButton
              onClick={handleUserMenuOpen}
              aria-haspopup="true"
              aria-controls={isUserMenuOpen ? 'account-menu' : undefined}
              aria-expanded={isUserMenuOpen ? 'true' : undefined}
              size="large"
              aria-label="account for current user"
              sx={{ mr: '8px' }}
            >
              <Avatar
                data-cy="user-menu-button"
                sx={{
                  width: 32,
                  height: 32,
                }}
                src={user.profileImage}
              >
                U
              </Avatar>
            </IconButton>

            <IconButton
              onClick={handleToggle}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open navigation"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={userMenuEl}
        open={isUserMenuOpen}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
        PaperProps={{
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user.username && (
          <MenuItem>
            <Person sx={{ mr: 1 }} />
            {user.username}
          </MenuItem>
        )}

        <Divider />

        {user.role === UserRoleEnum.ADMIN && (
          <MenuItem>
            <NextLink passHref href="/settings">
              <Link sx={{ display: 'flex', color: 'inherit' }} underline="none">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </Link>
            </NextLink>
          </MenuItem>
        )}
        {isLogged ? (
          <MenuItem onClick={onLogout} data-cy="logout-button">
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <MenuItem data-cy="login-button">
            <NextLink passHref href="/auth">
              <Link sx={{ display: 'flex', color: 'inherit' }} underline="none">
                <ListItemIcon>
                  <Login fontSize="small" />
                </ListItemIcon>
                Login
              </Link>
            </NextLink>
          </MenuItem>
        )}
      </Menu>

      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
          },
        }}
        sx={{
          '& .MuiPaper-root': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            width: '320px',
            '& .MuiBox-root': {
              p: '16px',
            },
          },
        }}
        open={drawerOpen}
        onClose={handleToggle}
      >
        {drawerOpen && (
          <IconButton
            sx={{
              position: 'fixed',
              top: '8px',
              left: '280px',
            }}
            onClick={handleToggle}
            size="large"
            edge="start"
            color="inherit"
            aria-label="close navigation"
          >
            <CloseOutlined />
          </IconButton>
        )}
        <Box>
          {NAV_ITEM_LIST.map((item) => (
            <Box key={item.href}>
              <NextLink href={item.href} passHref>
                <Link
                  fontSize={24}
                  fontWeight={700}
                  color="text.primary"
                  underline="hover"
                >
                  {item.label}
                </Link>
              </NextLink>
            </Box>
          ))}
        </Box>

        {/* TODO: 라우팅 여부에 따라 변경 */}
        <Box>
          <IconButton
            LinkComponent="a"
            href="/rss"
            target="_blank"
            color="inherit"
          >
            <RssFeed />
          </IconButton>
          <NextLink href={'/tags'} passHref>
            <IconButton LinkComponent="a" color="inherit">
              <LocalOffer />
            </IconButton>
          </NextLink>
          {isLogged ? (
            <IconButton color="inherit" onClick={onLogout}>
              <Logout />
            </IconButton>
          ) : (
            <NextLink href={'/login'} passHref>
              <IconButton color="inherit">
                <Login />
              </IconButton>
            </NextLink>
          )}

          <IconButton
            onClick={onThemeChange}
            size="large"
            edge="start"
            color="inherit"
            aria-label="change theme color"
          >
            {themeMode ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Box>
      </Drawer>
    </AppBar>
  );
};
