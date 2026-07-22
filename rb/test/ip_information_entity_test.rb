# IpInformation entity test

require "minitest/autorun"
require "json"
require_relative "../ProxyChecker_sdk"
require_relative "runner"

class IpInformationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ProxyCheckerSDK.test(nil, nil)
    ent = testsdk.IpInformation(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = ip_information_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "ip_information." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set PROXYCHECKER_TEST_IP_INFORMATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    ip_information_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.ip_information")))
    ip_information_ref01_data = nil
    if ip_information_ref01_data_raw.length > 0
      ip_information_ref01_data = Helpers.to_map(ip_information_ref01_data_raw[0][1])
    end

    # LOAD
    ip_information_ref01_ent = client.IpInformation(nil)
    ip_information_ref01_match_dt0 = {}
    ip_information_ref01_data_dt0_loaded = ip_information_ref01_ent.load(ip_information_ref01_match_dt0, nil)
    assert !ip_information_ref01_data_dt0_loaded.nil?

  end
end

def ip_information_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "ip_information", "IpInformationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ProxyCheckerSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["ip_information01", "ip_information02", "ip_information03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["PROXYCHECKER_TEST_IP_INFORMATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PROXYCHECKER_TEST_IP_INFORMATION_ENTID" => idmap,
    "PROXYCHECKER_TEST_LIVE" => "FALSE",
    "PROXYCHECKER_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["PROXYCHECKER_TEST_IP_INFORMATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["PROXYCHECKER_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = ProxyCheckerSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["PROXYCHECKER_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["PROXYCHECKER_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
