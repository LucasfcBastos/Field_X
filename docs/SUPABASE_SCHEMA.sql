-- ============================================================
-- Field X — Supabase Schema
-- Execute este arquivo no SQL Editor do Supabase
-- ============================================================

-- EXTENSÕES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- para coordenadas geoespaciais

-- ── PROFILES (extensão do auth.users) ──────────────────────

CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  name        TEXT NOT NULL,
  farm_name   TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles: self only" ON profiles FOR ALL USING (auth.uid() = id);

-- ── FARMS ──────────────────────────────────────────────────

CREATE TABLE farms (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id              UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name                 TEXT NOT NULL,
  location             TEXT,
  total_area_hectares  NUMERIC,
  latitude             NUMERIC,
  longitude            NUMERIC,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "farms: owner only" ON farms FOR ALL USING (auth.uid() = user_id);

-- ── FIELDS (TALHÕES) ───────────────────────────────────────

CREATE TABLE fields (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id        UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  area_hectares  NUMERIC,
  crop           TEXT,
  latitude       NUMERIC,
  longitude      NUMERIC,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE fields ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fields: farm owner" ON fields FOR ALL
  USING (EXISTS (SELECT 1 FROM farms WHERE farms.id = fields.farm_id AND farms.user_id = auth.uid()));

-- ── OPERATIONS ─────────────────────────────────────────────

CREATE TABLE operations (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  field_id         UUID REFERENCES fields(id) ON DELETE SET NULL,
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date             DATE NOT NULL,
  description      TEXT NOT NULL,
  rainfall         TEXT,
  cost             TEXT,
  crop_health      TEXT,
  tractor_hours    TEXT,
  spray_volume     TEXT,
  soil_moisture    TEXT,
  air_temperature  TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE operations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "operations: owner only" ON operations FOR ALL USING (auth.uid() = user_id);

-- ── SENSORS ────────────────────────────────────────────────

CREATE TABLE sensors (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id             UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  field_id            UUID REFERENCES fields(id) ON DELETE SET NULL,
  name                TEXT NOT NULL,
  type                TEXT NOT NULL,
  manufacturer        TEXT,
  measurement_unit    TEXT,
  collection_interval TEXT,
  battery_level       NUMERIC CHECK (battery_level BETWEEN 0 AND 100),
  connectivity        TEXT,
  status              TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','maintenance')),
  latitude            NUMERIC,
  longitude           NUMERIC,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE sensors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sensors: farm owner" ON sensors FOR ALL
  USING (EXISTS (SELECT 1 FROM farms WHERE farms.id = sensors.farm_id AND farms.user_id = auth.uid()));

-- ── SENSOR_READINGS ────────────────────────────────────────

CREATE TABLE sensor_readings (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sensor_id    UUID NOT NULL REFERENCES sensors(id) ON DELETE CASCADE,
  value        NUMERIC NOT NULL,
  unit         TEXT NOT NULL,
  recorded_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE sensor_readings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sensor_readings: sensor owner" ON sensor_readings FOR ALL
  USING (EXISTS (
    SELECT 1 FROM sensors
    JOIN farms ON farms.id = sensors.farm_id
    WHERE sensors.id = sensor_readings.sensor_id AND farms.user_id = auth.uid()
  ));

-- ── MACHINERY ──────────────────────────────────────────────

CREATE TABLE machinery (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id       UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  type          TEXT NOT NULL,
  manufacturer  TEXT,
  model         TEXT,
  year          INTEGER,
  hours_used    NUMERIC,
  spray_volume  NUMERIC,
  connectivity  TEXT,
  status        TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','maintenance')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE machinery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "machinery: farm owner" ON machinery FOR ALL
  USING (EXISTS (SELECT 1 FROM farms WHERE farms.id = machinery.farm_id AND farms.user_id = auth.uid()));

-- ── MACHINERY_TELEMETRY ────────────────────────────────────

CREATE TABLE machinery_telemetry (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  machinery_id  UUID NOT NULL REFERENCES machinery(id) ON DELETE CASCADE,
  hours_used    NUMERIC NOT NULL,
  fuel_used     NUMERIC,
  area_worked   NUMERIC,
  engine_temp   NUMERIC,
  recorded_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ── DRONE_IMAGES ───────────────────────────────────────────

CREATE TABLE drone_images (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  farm_id         UUID NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
  field_id        UUID REFERENCES fields(id) ON DELETE SET NULL,
  image_url       TEXT NOT NULL,
  description     TEXT,
  captured_at     TIMESTAMPTZ NOT NULL,
  processed_at    TIMESTAMPTZ,
  analysis_result TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE drone_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "drone_images: farm owner" ON drone_images FOR ALL
  USING (EXISTS (SELECT 1 FROM farms WHERE farms.id = drone_images.farm_id AND farms.user_id = auth.uid()));

-- ── FIELD_IMAGES ───────────────────────────────────────────

CREATE TABLE field_images (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  field_id     UUID REFERENCES fields(id) ON DELETE SET NULL,
  operation_id UUID REFERENCES operations(id) ON DELETE SET NULL,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url    TEXT NOT NULL,
  description  TEXT,
  captured_at  TIMESTAMPTZ NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE field_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "field_images: owner only" ON field_images FOR ALL USING (auth.uid() = user_id);

-- ── AI_INSIGHTS ────────────────────────────────────────────

CREATE TABLE ai_insights (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_id   UUID REFERENCES farms(id) ON DELETE SET NULL,
  type      TEXT NOT NULL,
  title     TEXT NOT NULL,
  content   TEXT NOT NULL,
  severity  TEXT CHECK (severity IN ('low','medium','high','critical')),
  provider  TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_insights: owner only" ON ai_insights FOR ALL USING (auth.uid() = user_id);

-- ── ALERTS ─────────────────────────────────────────────────

CREATE TABLE alerts (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_id      UUID REFERENCES farms(id) ON DELETE SET NULL,
  sensor_id    UUID REFERENCES sensors(id) ON DELETE SET NULL,
  machinery_id UUID REFERENCES machinery(id) ON DELETE SET NULL,
  type         TEXT NOT NULL,
  title        TEXT NOT NULL,
  message      TEXT NOT NULL,
  severity     TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info','warning','error','critical')),
  read         BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "alerts: owner only" ON alerts FOR ALL USING (auth.uid() = user_id);

-- ── STORAGE BUCKETS ────────────────────────────────────────
-- Execute no painel Storage > Buckets > New Bucket:
-- Bucket name: field-images
-- Public: true (ou configure RLS conforme necessário)

-- ── TRIGGERS ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_farms_updated_at BEFORE UPDATE ON farms FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_fields_updated_at BEFORE UPDATE ON fields FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_operations_updated_at BEFORE UPDATE ON operations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_sensors_updated_at BEFORE UPDATE ON sensors FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_machinery_updated_at BEFORE UPDATE ON machinery FOR EACH ROW EXECUTE FUNCTION update_updated_at();
