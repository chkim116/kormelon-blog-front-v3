/* eslint-disable indent */
// TODO: 분할 필요 - 220927
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  CloseOutlined,
  DarkMode,
  Edit,
  LightMode,
  LocalOffer,
  Login,
  Logout,
  Notifications,
  RssFeed,
  Security,
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
  Slide,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { UserRoleEnum } from '@core/entities/auth.entity';
import { HeaderHandle } from '@shared/containers/Layout';
import { NotificationSearchModel } from '@shared/models/notification.model';
import { UserModel } from '@features/auth/models/user.model';

const NAV_ITEM_LIST = [
  {
    label: 'Blog',
    href: '/blog',
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
  user: UserModel;
  notifications: NotificationSearchModel[];
  isLogged: boolean;
  onLogout: () => void;
  onThemeChange: () => void;
  themeMode: boolean;
}

export const Header = forwardRef<HeaderHandle, HeaderProps>(
  (
    { user, isLogged, themeMode, notifications, onThemeChange, onLogout },
    ref,
  ) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [userMenuEl, setUserMenuEl] = useState<HTMLElement | null>(null);
    const [notiMenuEl, setNotiMenuEl] = useState<HTMLElement | null>(null);
    const [isFadeIn, setIsFadeIn] = useState(true);
    const { pathname } = useRouter();

    const isUserMenuOpen = useMemo(() => Boolean(userMenuEl), [userMenuEl]);
    const isNotiMenuOpen = useMemo(() => Boolean(notiMenuEl), [notiMenuEl]);

    const handleToggle = () => {
      setDrawerOpen((prev) => !prev);
    };

    const handleNotiMenuOpen: React.MouseEventHandler<HTMLElement> = (e) => {
      setNotiMenuEl(e.currentTarget);
    };
    const handleUserMenuOpen: React.MouseEventHandler<HTMLElement> = (e) => {
      setUserMenuEl(e.currentTarget);
    };

    const handleUserMenuClose = () => {
      setUserMenuEl(null);
    };
    const handleNotiMenuClose = () => {
      setNotiMenuEl(null);
    };

    useImperativeHandle(
      ref,
      () => ({
        open() {
          setIsFadeIn(true);
        },
        hide() {
          setIsFadeIn(false);
        },
      }),
      [],
    );

    useEffect(() => {
      setDrawerOpen(false);
    }, [pathname]);

    return (
      <Slide mountOnEnter unmountOnExit in={isFadeIn}>
        <AppBar
          position="fixed"
          enableColorOnDark
          sx={{
            fontSize: '1.1rem',
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
          }}
        >
          <Toolbar
            sx={{
              backgroundColor: 'background.paper',
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
            <Typography variant="h5" noWrap component="div" flex={1}>
              <NextLink href="/" passHref>
                <Link underline="none" color="text.primary" fontWeight="bold">
                  K-DEV
                </Link>
              </NextLink>
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
                  <Link
                    color="text.secondary"
                    underline="none"
                    sx={{
                      transition: 'color 300ms',
                      ':hover': {
                        color: 'text.primary',
                      },
                    }}
                  >
                    {item.label}
                  </Link>
                </NextLink>
              ))}
            </Box>

            <Box
              display="flex"
              justifyContent="flex-end"
              flex={1}
              flexGrow={{ xs: 2, sm: 1 }}
            >
              <Box>
                <IconButton
                  onClick={onThemeChange}
                  size="medium"
                  edge="start"
                  aria-label="change theme color"
                  sx={{
                    ml: user.id ? '12px' : 0,
                  }}
                >
                  {themeMode ? <DarkMode /> : <LightMode />}
                </IconButton>
                <NextLink href={'/tags'} passHref>
                  <IconButton
                    LinkComponent="a"
                    sx={{
                      display: {
                        xs: 'none',
                        sm: 'inline-flex',
                      },
                    }}
                  >
                    <LocalOffer />
                  </IconButton>
                </NextLink>
                {user.id && (
                  <IconButton
                    size="medium"
                    aria-label="show new notifications"
                    onClick={handleNotiMenuOpen}
                  >
                    <Badge badgeContent={notifications.length} color="error">
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
                  aria-label="open navigation"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
          <Menu
            anchorEl={notiMenuEl}
            open={isNotiMenuOpen}
            onClose={handleNotiMenuClose}
            onClick={handleNotiMenuClose}
            disableScrollLock={true}
            PaperProps={{
              sx: {
                overflow: 'visible',
                p: 2,
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
            {notifications.length
              ? notifications.map(({ postId, id, message }) => (
                  <Box maxWidth="300px" borderBottom="1px solid" key={id}>
                    <div>{message}</div>
                    <NextLink
                      href={`/blog/${postId}?notification=${id}`}
                      passHref
                    >
                      <Link>바로가기</Link>
                    </NextLink>
                  </Box>
                ))
              : '아직 알림이 없습니다.'}
          </Menu>

          <Menu
            anchorEl={userMenuEl}
            open={isUserMenuOpen}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
            disableScrollLock={true}
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
                <Avatar
                  aria-describedby="user profile"
                  sx={{
                    mr: 1,
                  }}
                  src={user.profileImage}
                >
                  U
                </Avatar>
                {user.username}
              </MenuItem>
            )}

            <Divider />

            {user.role === UserRoleEnum.ADMIN && (
              <Box>
                <MenuItem>
                  <NextLink passHref href="/blog/write">
                    <Link
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'inherit',
                      }}
                      data-cy="blog-write-button"
                      underline="none"
                    >
                      <ListItemIcon>
                        <Edit fontSize="small" />
                      </ListItemIcon>
                      글작성
                    </Link>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink passHref href="/settings/category">
                    <Link
                      data-cy="setting-button"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'inherit',
                      }}
                      underline="none"
                    >
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      설정
                    </Link>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink passHref href="/blog/private">
                    <Link
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'inherit',
                      }}
                      underline="none"
                    >
                      <ListItemIcon>
                        <Security fontSize="small" />
                      </ListItemIcon>
                      비밀글
                    </Link>
                  </NextLink>
                </MenuItem>
              </Box>
            )}
            {isLogged ? (
              <MenuItem onClick={onLogout} data-cy="logout-button">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                로그아웃
              </MenuItem>
            ) : (
              <MenuItem data-cy="login-button">
                <NextLink passHref href="/auth">
                  <Link
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'inherit',
                    }}
                    underline="none"
                  >
                    <ListItemIcon>
                      <Login fontSize="small" />
                    </ListItemIcon>
                    로그인
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
      </Slide>
    );
  },
);

Header.displayName = 'Header';
