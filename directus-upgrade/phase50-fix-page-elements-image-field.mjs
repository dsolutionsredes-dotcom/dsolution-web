const DIRECTUS_URL = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://admin.d-solution.org').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

if (!DIRECTUS_TOKEN) {
  console.error('Falta DIRECTUS_TOKEN.');
  console.error('Ejemplo: DIRECTUS_URL=https://admin.d-solution.org DIRECTUS_TOKEN=TU_TOKEN node directus-upgrade/phase50-fix-page-elements-image-field.mjs');
  process.exit(1);
}

async function api(path, options = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      ...(options.headers || {}),
    },
  });
  const raw = await res.text();
  let json = null;
  try { json = raw ? JSON.parse(raw) : null; } catch {}
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} => ${res.status} ${raw}`);
  return json;
}

async function tryApi(path, options = {}) {
  try {
    return await api(path, options);
  } catch (error) {
    return { error };
  }
}

async function fieldExists() {
  const result = await tryApi('/fields/page_elements/image');
  return !result.error;
}

async function fixFieldMeta() {
  if (!(await fieldExists())) {
    await api('/fields/page_elements', {
      method: 'POST',
      body: JSON.stringify({
        field: 'image',
        type: 'uuid',
        meta: {
          interface: 'file-image',
          special: ['file'],
          display: 'image',
          width: 'full',
          note: 'Imagen editable desde Directus Files',
          options: {
            folder: null,
          },
          display_options: {},
        },
        schema: {
          name: 'image',
          data_type: 'uuid',
          is_nullable: true,
        },
      }),
    });
    console.log('+ Campo page_elements.image creado como File/Image normal');
    return;
  }

  await api('/fields/page_elements/image', {
    method: 'PATCH',
    body: JSON.stringify({
      meta: {
        interface: 'file-image',
        special: ['file'],
        display: 'image',
        width: 'full',
        note: 'Imagen editable desde Directus Files',
        options: {
          folder: null,
        },
        display_options: {},
      },
      schema: {
        is_nullable: true,
      },
    }),
  });
  console.log('✓ Campo page_elements.image actualizado a File/Image normal');
}

const relationPayload = {
  collection: 'page_elements',
  field: 'image',
  related_collection: 'directus_files',
  meta: {
    many_collection: 'page_elements',
    many_field: 'image',
    one_collection: 'directus_files',
    one_field: null,
    one_collection_field: null,
    one_allowed_collections: null,
    one_deselect_action: 'nullify',
    junction_field: null,
    sort_field: null,
  },
  schema: {
    table: 'page_elements',
    column: 'image',
    foreign_key_table: 'directus_files',
    foreign_key_column: 'id',
    on_delete: 'SET NULL',
    on_update: 'NO ACTION',
  },
};

async function fixRelation() {
  const existing = await tryApi('/relations/page_elements/image');

  if (!existing.error) {
    await api('/relations/page_elements/image', {
      method: 'PATCH',
      body: JSON.stringify(relationPayload),
    });
    console.log('✓ Relación page_elements.image → directus_files actualizada');
    return;
  }

  const created = await tryApi('/relations', {
    method: 'POST',
    body: JSON.stringify(relationPayload),
  });

  if (!created.error) {
    console.log('+ Relación page_elements.image → directus_files creada');
    return;
  }

  // Some Directus installations already have the database FK but not a readable REST relation response.
  // In that case, keep the field meta fix and show the exact error for visibility.
  console.warn('⚠ No se pudo crear/actualizar la relación automáticamente.');
  console.warn(String(created.error?.message || created.error));
}

await fixFieldMeta();
await fixRelation();

const field = await api('/fields/page_elements/image');
console.log('\nEstado final del campo image:');
console.log(JSON.stringify({
  field: field?.data?.field,
  type: field?.data?.type,
  interface: field?.data?.meta?.interface,
  special: field?.data?.meta?.special,
  display: field?.data?.meta?.display,
}, null, 2));

console.log('\nListo. Recarga Directus con Ctrl+F5 y prueba otra vez el selector de imagen.');
