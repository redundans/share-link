import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import PostControls from 'flarum/forum/utils/PostControls';
import Button from 'flarum/common/components/Button';
import ItemList from 'flarum/common/utils/ItemList';
import Post from 'flarum/common/models/Post';
import type Mithril from 'mithril';

app.initializers.add('redundans/share-link', () => {
  extend(PostControls, 'userControls', function (items: ItemList<Mithril.Children>, post: Post) {
    const postUrl: string = window.location.origin + app.route.post(post);

    items.add(
      'copy-link',
      <Button
        icon="fas fa-link"
        onclick={() => {
          navigator.clipboard.writeText(postUrl)
            .then(() => {
              app.alerts.show({ type: 'success' }, 'Länken kopierad till urklipp!');
            })
            .catch((err: Error) => {
              app.alerts.show({ type: 'error' }, 'Kunde inte kopiera länk.');
              console.error('Kopiering misslyckades: ', err);
            });
        }}
      >
        Kopiera länk
      </Button>,
      10
    );
  });
});
