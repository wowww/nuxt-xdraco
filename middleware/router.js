import redirections from '@/middleware/redirections.json';

export default function({ route, redirect, $dracoApi }) {
  const { path } = route;

  // blocking by ip address
  $dracoApi.post('/ip/draco/access').then(({ data: { Code } }) => {
    if (Code === 80807) {
      redirect('/error/unavailable');
    }
  }).catch(() => {
    redirect('/error/unavailable');
  });

  const destination = redirections.find(({ from }) => from === path);
  if (destination) {
    redirect(destination.to);
  }
}
