# correction OTAKU

## Récuprer 15 lignes

```sql
SELECT * FROM viewing LIMIT 15;
```

## Selectionner toutes les données, rangées dans un ordre aléatoire

```sql
SELECT * FROM viewing ORDER BY random();
```

## Récupérer 15 lignes de manière aléatoire

```sql
SELECT * FROM viewing ORDER BY random() LIMIT 15;
```

## La moyenne d'age des viewers, classée par pays

```sql
SELECT viewer_country, avg(viewer_age_group)
FROM viewing
GROUP BY viewer_country;
```

## Nombre d'épiodes regardés, classé par tranche d'age et rangé par tranche d'age décroissant

```sql
SELECT viewer_age_group, count(*) as visionnages
FROM viewing 
GROUP BY viewer_age_group 
ORDER BY viewer_age_group DESC;
```

## Le nombre de visionnage par an

```sql
SELECT extract(year from viewing_date) as date,
count(*) AS visionnages
FROM viewing group by date;
```
